import React from "react";
import "./AtivityCard.css";

export const ActivityCard = ({ name, description, image_1 }) => {
    let roleText = "";

    return (
        <div className="card-all-activities row">
            <div className="card-all-activitie-container-image">
                <img className="card-all-activities-image" src={image_1} alt={name} />
            </div>

            <div className="card-all-activities__content col">
                <p className="card-all-activities__title">{name}</p>
                <p className="card-all-activities__description">{description}</p>
            </div>
        </div>
    );
};