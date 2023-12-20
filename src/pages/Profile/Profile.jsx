import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { getProfile, updateProfile, updatePassword } from "../../services/apiCall";
import PasswordModal from "../../common/PasswordModal/PasswordModal";

export const Profile = () => {
    const rdxToken = useSelector(selectToken);
    const [user, setUser] = useState({
        name: "",
        email: "",
        image: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        nameError: "",
        emailError: "",
        imageError: "",
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingField, setEditingField] = useState(null);

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

    const handleEditClick = (fieldName) => {
        setEditingField(fieldName);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleUpdateProfile = () => {
        const updatedUser = { [editingField]: user[editingField] };
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
                                            <button className="button-edit" onClick={() => handleEditClick('name')}>
                                                <svg height="1em" viewBox="0 0 512 512">
                                                    <path
                                                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                                    ></path>
                                                </svg>
                                            </button>
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
                                            <button className="button-edit" onClick={() => handleEditClick('email')}>
                                                <svg height="1em" viewBox="0 0 512 512">
                                                    <path
                                                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </>
                                    }
                                </div>

                                <div className="button-update-profile-container">
                                    <button className="button-update-profile" onClick={handleUpdateProfile}>Update my profile</button>
                                </div>

                                <div>
                                    <button onClick={() => setIsModalOpen(true)}>Change Password</button>
                                    <PasswordModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        rdxToken={rdxToken}
                                    />
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
