import React from "react";
import './ActivityCardDetail.css';
import { Carousel } from 'react-bootstrap';

export const ActivityCardDetail = ({ name, description, image_1, image_2, location, duration }) => {
    return (
        <div className="detail-card-all-activities">
            <Carousel interval={null}>
                <Carousel.Item>
                    <img className="detail-card-all-activities-image" src={image_1} alt={name} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="detail-card-all-activities-image" src={image_2} alt={name} />
                </Carousel.Item>
            </Carousel>

            <div className="detail-card-all-activities__content">
                <p className="detail-card-all-activities__title">{name}</p>
                <p className="detail-card-all-activities__description">{description}</p>
                <p className="detail-card-all-activities__duration">{duration} horas</p>
            </div>

            <p className="detail-card-all-activities__location">{location}</p>
        </div>
    );
};