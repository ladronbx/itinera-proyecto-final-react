import React from 'react';
import './RemoveButtonUserSuper.css';
import { Modal } from 'antd';
import { deleteUser } from '../../services/apiCall';

export const RemoveButtonUserSuper = ({ userId, rdxToken, onUserRemoved }) => {
    const handleRemoveUserSuper = async () => {
        try {
            await deleteUser(userId, rdxToken);
            Modal.success({
                content: 'Usuario eliminado con éxito',
            });
            onUserRemoved();
        } catch (error) {
            Modal.error({
                content: 'Error al eliminar usuario',
            });
        }
    };

    return (
        <div className="common-remove-button" onClick={handleRemoveUserSuper}>
            <span className="common-remove-text">Remove</span>
            <span className="common-remove-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
            </span>
        </div>
    );
};