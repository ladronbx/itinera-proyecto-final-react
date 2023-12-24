import React from "react";
import "./TripCardDetailMember.css";
import { RemoveButtonMemberGroup } from "../RemoveButtonMemberGroup/RemoveButtonMemberGroup";

export const TripCardDetailMember = ({ name, image, email, tripId, userId, rdxToken, onMemberRemoved = () => {} }) => {
    let roleText = "";

    return (
        <div className="card-allusers">
            <div className="card-alluser-container-image">
                <img className="card-allusers-image" src={image} alt={name} />
            </div>

            <div className="card-allusers__content col">
                <p className="card-allusers__title">{name}</p>
                <p className="card-allusers__description">{email}</p>
            </div>

            <div className="remove-button">
                <RemoveButtonMemberGroup tripId={tripId} userId={userId} rdxToken={rdxToken} onMemberRemoved={onMemberRemoved} />
            </div>
        </div>
    );
};