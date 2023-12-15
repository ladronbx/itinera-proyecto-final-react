import React, { useEffect, useState } from "react";
import './TripDetail.css';
import { selectToken } from '../userSlice';
import { useSelector } from 'react-redux';
import { getMyTripById } from "../../services/apiCall";
import { useParams } from "react-router-dom";
import { TripCardDetailMember } from "../../common/TripCardDetailMember/TripCardDetailMember";

export const TripDetail = () => {
    const rdxToken = useSelector(selectToken);
    const [trip, setTrip] = useState(null);
    const { id } = useParams();

    if (!rdxToken) {
        navigate("/");
    }

    useEffect(() => {
        if (id && rdxToken) {
            getMyTripById(id, rdxToken)
                .then((response) => {
                    setTrip(response.data.data);
                })
                .catch((error) => console.log(error));
        }else{
            navigate("/");
        }
    }, [id, rdxToken]);

    if (!trip) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Viaje a {trip.location}</h1>
            <p>Fecha de inicio: {new Date(trip.start_date).toLocaleDateString()} - Fecha de fin: {new Date(trip.end_date).toLocaleDateString()}</p>
            <p>Número de viajeros: {trip.members_group}</p>
            <h2>Miembros del grupo:</h2>
            {
                trip.members_name.length > 0
                ? (
                    trip.members_name.map((name, index) => (
                        <TripCardDetailMember
                            key={index}
                            name={name}
                            email={trip.members_email[index]}
                            image={trip.members_image[index]}
                        />
                    ))
                )
                : (
                    <div>No hay miembros en el grupo</div>
                )
            }
            <h2>Actividades:</h2>
            {trip.activity_name.map((activity, index) => (
                <div key={index}>
                    <p>Actividad: {activity}</p>
                    <img src={trip.activity_image[index]} alt={activity} />
                </div>
            ))}
        </div>
    )
}