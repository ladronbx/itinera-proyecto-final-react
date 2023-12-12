import React from "react";
import "./LocationCard.css";

export const LocationCard = ({ name, description, image_1, onClick }) => {
    let roleText = "";

    return (
        <div className="card-all-locations row" onClick={onClick}>
            <div className="card-all-location-container-image">
                <img className="card-all-locations-image" src={image_1} alt={name} />
            </div>

            <div className="card-all-locations__content col">
                <p className="card-all-locations__title">{name}</p>
                <p className="card-all-locations__description">{description}</p>
            </div>
        </div>
    );
};