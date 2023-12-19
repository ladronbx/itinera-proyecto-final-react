import React from "react";
import "./TripCardDetailMember.css";
import { RemoveButton } from "../RemoveButton/RemoveButton";

export const TripCardDetailMember = ({ name, image, email, tripId, userId, rdxToken }) => {
    let roleText = "";

    return (
        <div className="card-allusers row">
            <div className="card-alluser-container-image">
                <img className="card-allusers-image" src={image} alt={name} />
            </div>

            <div className="card-allusers__content col">
                <p className="card-allusers__title">{name}</p>
                <p className="card-allusers__description">{email}</p>
            </div>

            <div className="remove-button">
                <RemoveButton tripId={tripId} userId={userId} rdxToken={rdxToken} />
            </div>
        </div>
    );
};