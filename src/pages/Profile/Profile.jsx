import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { getProfile, updateProfile, updatePassword } from "../../services/apiCall";

export const Profile = () => {
    const rdxToken = useSelector(selectToken);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
        imageError: "",
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (rdxToken) {
            getProfile(rdxToken)
                .then((response) => {
                    setUser(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/login");
        }
    }, [rdxToken, navigate]);

    const [editingField, setEditingField] = useState(null);

    const handleEditClick = (fieldName) => {
        setEditingField(fieldName);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    //handleUpdatePassword
    const handleUpdatePassword = (event) => {
        const { name, value } = event.target;
        setPassword({ ...password, [name]: value });
    }

    const handleUpdateProfile = () => {
        const updatedUser = { [editingField]: user[editingField] };
        //si los campos son name, email o image = updateProfile
        if (editingField === 'name' || editingField === 'email' || editingField === 'image') {
            updateProfile(updatedUser, rdxToken)
                .then((response) => {
                    console.log(response.data);
                    setEditingField(null);

                    getProfile(rdxToken)
                        .then((response) => {
                            setUser(response.data.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                })
                .catch((error) => {
                    console.log(error.response.data);
                    setErrorMessages(error.response.data.error);
                });
        }
    };

    const handleUpdatePasswordClick = () => {
        updatePassword(password, rdxToken)
            .then((response) => {
                console.log(response.data);
                setEditingField(null);

                getProfile(rdxToken)
                    .then((response) => {
                        setUser(response.data.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            })
            .catch((error) => {
                console.log(error.response.data);
                setErrorMessages(error.response.data.error);
            });
    };

    return (
        <div className="container-main-profile">
            {
                user
                    ? (
                        <div className="container-profile">


                            <div className="container-left-img-profile col">
                                <img src={user.image} alt="User" className="profile-image" />
                            </div>

                            <div className="profile-column col">

                                <div className="full-name-profile">
                                    {editingField === 'name'
                                        ? <div>
                                            <input className="full-name-profile-input" type="text" name="name" value={user.name} onChange={handleInputChange} />
                                            {errorMessages.name && <div className="error-message-style">{errorMessages.name}</div>}
                                        </div>
                                        : <>
                                            {user.name}
                                            <button className="button-edit" onClick={() => handleEditClick('name')}>Edit</button>
                                        </>
                                    }
                                </div>

                                <div className="email-name-profile">
                                    {editingField === 'email'
                                        ? <div>
                                            <input className="email-profile-input" type="email" name="email" value={user.email} onChange={handleInputChange} />
                                            {errorMessages.email && <div className="error-message-style">{errorMessages.email}</div>}
                                        </div>
                                        : <>
                                            {user.email}
                                            <button className="button-edit" onClick={() => handleEditClick('email')}>Edit</button>
                                        </>
                                    }
                                </div>

                                <div className="button-update-profile-container">
                                    <button className="button-update-profile" onClick={handleUpdateProfile}>Update my profile</button>
                                </div>


                                <div className="password-profile">
                                    {editingField === 'password'
                                        ? <div>
                                            <input className="password-profile-input" type="password" name="currentPassword" placeholder="Current Password" value={password.currentPassword} onChange={handleUpdatePassword} />
                                            <input className="password-profile-input" type="password" name="newPassword" placeholder="New Password" value={password.newPassword} onChange={handleUpdatePassword} />
                                            {errorMessages.password && <div className="error-message-style">{errorMessages.password}</div>}
                                            <button className="button-update-password" onClick={handleUpdatePasswordClick}>Update Password</button>
                                        </div>
                                        : <>
                                            <button className="button-edit" onClick={() => handleEditClick('password')}>Change Password</button>
                                        </>
                                    }
                                </div>




                            </div>
                        </div>
                    )
                    : (
                        <div>Loading ...</div>
                    )
            }
        </div>
    );
};
