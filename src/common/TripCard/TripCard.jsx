import React from "react";
import "./TripCard.css";

export const TripCard = ({ dates, location, group }) => {
    let roleText = "";
    // to do : role text
    return (
        <div className="card-all-trips row">
            <div className="card-all-trip-container-image">
                <p className="card-all-trips__title">{dates}</p>
            </div>

            <div className="card-all-trips__content col">
                <p className="card-all-trips__title">{location}</p>
                <p className="card-all-trips__description">{group}</p>
            </div>
        </div>
    );
};