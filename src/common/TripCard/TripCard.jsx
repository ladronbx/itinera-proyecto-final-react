import React from "react";
import "./TripCard.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { RemoveButtonTrip } from "../RemoveButtonTrip/RemoveButtonTrip";

export const TripCard = ({ id, location, memberscount, start_date, end_date, image_1, image_2, image_3, tripId, rdxToken, onTripRemoved }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/my-trip/${id}`);
    };

    return (
        <div className="location-card-all-trips">
            <div className="buttons-container-style-trip">
                <div className="delete-my-trip-style" ><RemoveButtonTrip tripId={tripId} rdxToken={rdxToken} onTripRemoved={onTripRemoved} /></div>
                <button className="location-card-all-trips__button" onClick={handleClick}>Ver detalles</button>
            </div>
            <h1 className="location-card-all-trips__title">{location}</h1>
            <div className="location-card-all-trips__image-container">
                <Carousel interval={null}>
                    <Carousel.Item>
                        <img className="location-card-all-trips__image" src={image_1} alt={location} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="location-card-all-trips__image" src={image_2} alt={location} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="location-card-all-trips__image" src={image_3} alt={location} />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="location-card-all-trips__content">
                <p className="location-card-all-trips__date">{new Date(start_date).toLocaleDateString()} - </p>
                <p className="location-card-all-trips__date">{new Date(end_date).toLocaleDateString()}</p>
                <p className="location-card-all-trips__description">Viajeros: {memberscount}</p>
            </div>
        </div>
    );
};

