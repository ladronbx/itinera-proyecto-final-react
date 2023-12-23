import React from 'react';
import './RemoveButtonActivitySuper.css';
import { Modal } from 'antd';
import { deleteActivity } from '../../services/apiCall';

export const RemoveButtonActivitySuper = ({ activityId, rdxToken, onActivityRemoved }) => {
    const handleRemoveActivitySuper = async () => {
        try {
            await deleteActivity(activityId, rdxToken);
            Modal.success({
                content: 'Actividad eliminada con éxito',
            });
            onActivityRemoved(); // Llama a la función de callback
        } catch (error) {
            Modal.error({
                content: 'Error al eliminar actividad',
            });
        }
    };

    return (
        <div className="common-remove-button" onClick={handleRemoveActivitySuper}>
            <span className="common-remove-text">Remove</span>
            <span className="common-remove-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
            </span>
        </div>
    );
};