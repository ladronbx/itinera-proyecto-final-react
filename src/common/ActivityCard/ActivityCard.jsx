import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./ActivityCard.css";
import { addActivity, selectActivities } from "../../pages/tripSlice";

export const ActivityCard = ({ id, name, description, image_1, image_2, location }) => {
    const dispatch = useDispatch();
    const selectedActivities = useSelector(selectActivities);

    const handleAddActivity = () => {
        let isSelected = selectedActivities.includes(id);
        if (isSelected) {
            console.log('Activity already selected:', id);
            return;
        }
        console.log('Adding activity:', id);
        dispatch(addActivity(id));
    };

    let isSelected = selectedActivities.includes(id);

    return (
        <div className={`card-all-activities row ${isSelected ? 'selected' : ''}`}>
            <div className="card-all-activities-container-image">
                <img className="card-all-activities-image" src={image_1} alt={name} />
                <img className="card-all-activities-image" src={image_2} alt={name} />
                {isSelected
                    ? <div className="selected-message">Actividad seleccionada</div>
                    : <button className="button-activities" onClick={handleAddActivity}>Agregar</button>
                }
            </div>
            <div className="card-all-activities__content col">
                <p className="card-all-activities__title">{name}</p>
                <p className="card-all-activities__description">{description}</p>

            </div>
            <p className="card-all-activities__location">{location}</p>
        </div>
    );
};