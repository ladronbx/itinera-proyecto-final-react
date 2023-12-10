import React from "react";
import "./ActivityCard.css";

export const ActivityCard = ({ name, description, image_1, image_2, location_id }) => {
    let roleText = "";

    return (
        //to do : faltará añadir location de la activity. transformar location_id por el nombre de la
        <div className="card-all-activities row">
            <div className="card-all-activities-container-image">
                <img className="card-all-activities-image" src={image_1} alt={name} />
                <img className="card-all-activities-image" src={image_2} alt={name} />
            </div>

            <div className="card-all-activities__content col">
                <p className="card-all-activities__title">{name}</p>
                <p className="card-all-activities__description">{description}</p>
                <p className="card-all-activities__description">{location_id}</p>
            </div>
        </div>
    );
};