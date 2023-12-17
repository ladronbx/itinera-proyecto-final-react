import React from "react";
import "./TripCardDetailMember.css";


export const TripCardDetailMember = ({ name, image, email }) => {
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
        </div>
    );
};
