import React, { useState, useEffect } from 'react';
import { verifyPassword, updateProfile } from "../../services/apiCall";

export const PasswordChange = ({ user, rdxToken, setEditingField }) => {
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const [errorMessages, setErrorMessages] = useState({
        oldPasswordError: "",
        newPasswordError: "",
    });

    const [shouldUpdate, setShouldUpdate] = useState(false);

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handlePasswordConfirmationChange = (event) => {
        setPasswordConfirmation(event.target.value);
    };

    const handleUpdateProfile = (event) => {
        event.preventDefault();

        if (newPassword !== passwordConfirmation) {
            alert('La nueva contraseña no coincide con la confirmación');
            return;
        }

        setShouldUpdate(true);
    };

    useEffect(() => {
        if (shouldUpdate) {
            verifyPassword({ password: oldPassword }, rdxToken)
                .then((response) => {
                    if (response.data.success) {
                        const updatedUser = { ...user, password: newPassword };

                        updateProfile(updatedUser, rdxToken)
                            .then((response) => {
                                console.log(response.data);
                                setEditingField(null);
                                setShouldUpdate(false);
                            })
                            .catch((error) => {
                                console.log(error);
                                setErrorMessages(error.response.data.error);
                                setShouldUpdate(false);
                            });
                    } else if (response.data.message === 'Incorrect password') {
                        setErrorMessages({ oldPasswordError: 'La contraseña anterior es incorrecta' });
                        setShouldUpdate(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessages(error.response.data.error);
                    setShouldUpdate(false);
                });
        }
    }, [shouldUpdate, user, newPassword, oldPassword, rdxToken, setEditingField]);

    return (
        <div>
            <div className="old-password-profile">
                <input type="password" name="oldPassword" value={oldPassword} onChange={handleOldPasswordChange} placeholder="Old password" />
                {errorMessages.oldPasswordError && <div style={{ color: "red" }}>{errorMessages.oldPasswordError}</div>}
            </div>
            <div className="new-password-profile">
                <input type="password" name="newPassword" value={newPassword} onChange={handleNewPasswordChange} placeholder="New password" />
                {errorMessages.newPasswordError && <div style={{ color: "red" }}>{errorMessages.newPasswordError}</div>}
            </div>
            <div className="password-confirmation-profile">
                <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} placeholder="Confirm your new password" />
            </div>

            <button className="update-profile" onClick={handleUpdateProfile}>Update</button>
        </div>
    );
};