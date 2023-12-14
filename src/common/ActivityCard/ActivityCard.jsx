import React from "react";
import { useDispatch } from 'react-redux';
import "./ActivityCard.css";
import { addActivity } from "../../pages/tripSlice";

export const ActivityCard = ({ name, description, image_1, image_2, location }) => {
    const dispatch = useDispatch();

    const handleAddActivity = () => {
        dispatch(addActivity({ name, description, image_1, image_2, location }));
    };

    return (
        <div className="card-all-activities row">
            <div className="card-all-activities-container-image">
                <img className="card-all-activities-image" src={image_1} alt={name} />
                <img className="card-all-activities-image" src={image_2} alt={name} />
            </div>

            <div className="card-all-activities__content col">
                <p className="card-all-activities__title">{name}</p>
                <p className="card-all-activities__description">{description}</p>
                <p className="card-all-activities__description">{location}</p>
                <button onClick={handleAddActivity}>Agregar actividad</button>
            </div>
        </div>
    );
};