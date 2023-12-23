import React from "react";
import "./LocationCard.css";
import { Carousel } from 'react-bootstrap';
import { RemoveButtonLocationSuper } from "../RemoveButtonLocationSuper/RemoveButtonLocationSuper";

export const LocationCard = ({ id, name, description, image_1, image_2, image_3, onClick, isSuperAdmin, rdxToken, onLocationRemoved }) => {
    let roleText = "";

    return (
        <div className="card-all-locations row">

                <div className="card-all-location-container-image">
                    <Carousel interval={null}>
                        <Carousel.Item>
                            <img className="card-all-locations-image" src={image_1} alt={name} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="card-all-locations-image" src={image_2} alt={name} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="card-all-locations-image" src={image_3} alt={name} />
                        </Carousel.Item>
                    </Carousel>
                </div>




            <div className="card-all-locations__content col">
                <button className="card-all-locations__button" onClick={onClick}>Seleccionar</button>
                <p className="card-all-locations__title">{name}</p>
                <p className="card-all-locations__description">{description}</p>
                {isSuperAdmin && <RemoveButtonLocationSuper locationId={id} rdxToken={rdxToken} onLocationRemoved={onLocationRemoved} />}

            </div>
        </div>
    );
};