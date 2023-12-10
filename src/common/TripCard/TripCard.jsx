import React from "react";
import "./TripCard.css";

export const TripCard = ({ start, end, location, group }) => {
    let roleText = "";
    // to do : role text
    return (
        <div className="card-all-trips row">
            <div className="card-all-trip-container-image"></div>

            <div className="card-all-trips__content col">
                <p className="card-all-trips__title">{location}</p>
                <p className="card-all-trips__description">{start}</p>
                <p className="card-all-trips__description">{end}</p>
                <p className="card-all-trips__description">{group}</p>
            </div>
        </div>
    );
};