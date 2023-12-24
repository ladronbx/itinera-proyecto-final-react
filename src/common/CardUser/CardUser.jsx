import React from "react";
import "./CardUser.css";
import { RemoveButtonUserSuper } from "../RemoveButtonUserSuper/RemoveButtonUserSuper";

export const CardUser = ({ name, image, email, is_active, role_id, userId, rdxToken, onUserRemoved }) => {
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
        <div className="super-card-alluserss">
            <div className="super-card-alluser-container-photo">
                <img className="super-card-allusers-photo" src={image} alt={name} />
            </div>

            <div className="super-card-allusers__content col">
                <p className="super-card-allusers__title">{name}</p>
                <p className="super-card-allusers__description">{email}</p>
                <p className="super-card-allusers__description">{activeText}</p>
                <p className="super-card-allusers__description">{roleText}</p>
                <RemoveButtonUserSuper userId={userId} rdxToken={rdxToken} onUserRemoved={onUserRemoved} />
            </div>
        </div>
    );
};