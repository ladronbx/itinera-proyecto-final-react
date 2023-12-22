import React from "react";
import "./CardUser.css";

export const CardUser = ({ name, image, email, is_active, role_id }) => {
    let roleText = "";
    let activeText = "";

    if (role_id === 1) {
        roleText = "Role: User";
    } else if (role_id === 2) {
        roleText = "Role: Admin";
    } else if (role_id === 3) {
        roleText = "Role: Super admin";
    }

    if(is_active === 0) {
        roleText = "Role: Inactive"
    }else if(is_active === 1){
        roleText = "Role: Active"
    }

    return (
        <div className="card-allusers row">
            <div className="card-alluser-container-photo">
                <img className="card-allusers-photo" src={image} alt={name} />
            </div>

            <div className="card-allusers__content col">
                <p className="card-allusers__title">{name}</p>
                <p className="card-allusers__description">{email}</p>
                <p className="card-allusers__description">{activeText}</p>
                <p className="card-allusers__description">{roleText}</p>
            </div>
        </div>
    );
};
