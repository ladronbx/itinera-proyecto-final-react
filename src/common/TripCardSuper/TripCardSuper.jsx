import React from "react";
import "./TripCardSuper.css";
import { useNavigate } from "react-router-dom";
import { RemoveButtonTripSuper } from "../RemoveButtonTripSuper/RemoveButtonTripSuper";

export const TripCardSuper = ({ id, location, memberscount, start_date, end_date, image_1, tripId, rdxToken, onTripRemoved }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/trips`);
    };

    return (
        <div className="location-card-all-trips row" onClick={handleClick}>
            <div className="location-card-all-trips__image-container">
                <p className="location-card-all-trips__title">{location}</p>
                <img className="location-card-all-trips__image" src={image_1} alt={image_1} />
            </div>
            <div className="location-card-all-trips__content col">
                <p className="location-card-all-trips__date">{start_date}</p>
                <p className="location-card-all-trips__date">{end_date}</p>
                <p className="location-card-all-trips__description">Viajeros : {memberscount}</p>
                <RemoveButtonTripSuper tripId={tripId} rdxToken={rdxToken} onTripRemoved={onTripRemoved} />
            </div>
        </div>
    );
};