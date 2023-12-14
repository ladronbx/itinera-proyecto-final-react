import React from "react";
import "./TripCard.css";

export const TripCard = ({location, membersCount, start_date, end_date}) => {
    let roleText = "";
    // to do : role text
    return (
        <div className="card-all-trips row">
            <div className="card-all-trip-container-image">
            <p className="card-all-trips__title">{location}</p>

            </div>

            <div className="card-all-trips__content col">
            <p className="card-all-trips__date">{start_date}</p>
                <p className="card-all-trips__date">{end_date}</p>
                <p className="card-all-trips__description">Viajeros : {membersCount}</p>
            </div>
        </div>
    );
};