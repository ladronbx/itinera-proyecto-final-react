import React from "react";
import "./LocationCard.css";
import { RemoveButtonLocationSuper } from "../RemoveButtonLocationSuper/RemoveButtonLocationSuper";

export const LocationCard = ({ id, name, description, image_1, onClick, isSuperAdmin,rdxToken, onLocationRemoved }) => {
    let roleText = "";

    return (
        <div className="card-all-locations row" onClick={onClick}>
            <div className="card-all-location-container-image">
                <img className="card-all-locations-image" src={image_1} alt={name} />
            </div>

            <div className="card-all-locations__content col">
                <p className="card-all-locations__title">{name}</p>
                <p className="card-all-locations__description">{description}</p>
                {isSuperAdmin && <RemoveButtonLocationSuper locationId={id} rdxToken={rdxToken} onLocationRemoved={onLocationRemoved} />}
            </div>
        </div>
    );
};