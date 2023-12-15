import React from "react";
import "./TripCard.css";
import { useNavigate } from "react-router-dom";


export const TripCard = ({ id, location, membersCount, start_date, end_date }) => {
    let roleText = "";
    // to do : role text

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/my-trip/${id}`);
    };

    return (
        <div className="card-all-trips row" onClick={handleClick}>
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