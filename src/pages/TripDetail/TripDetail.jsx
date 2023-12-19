import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './TripDetail.css';
import { selectToken } from '../userSlice';
import { useSelector } from 'react-redux';
import { getMyTripById, addMemberToTrip } from "../../services/apiCall";
import { useParams } from "react-router-dom";
import { TripCardDetailMember } from "../../common/TripCardDetailMember/TripCardDetailMember";
import TripCalendar from "../../common/TripCalendar/TripCalendar";
import { ActivityCardDetail } from "../../common/ActivityCardDetail/ActivityCardDetail";

export const TripDetail = () => {
    const rdxToken = useSelector(selectToken);
    const [trip, setTrip] = useState(null);
    const { id } = useParams();
    const [emailInput, setEmailInput] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isAddingMember, setIsAddingMember] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!rdxToken) {
            navigate("/");
        }
    }, [rdxToken, navigate]);

    useEffect(() => {
        if (id && rdxToken) {
            getMyTripById(id, rdxToken)
                .then((response) => {
                    setTrip(response.data.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        navigate("/");
                    } else {
                        console.error('Error:', error);
                    };
                })
        } else {
            navigate("/");
        }
    }, [id, rdxToken, navigate]);

    useEffect(() => {
        if (isAddingMember) {
            addMemberToTrip(id, emailInput, rdxToken)
                .then(response => {
                    if (response.data.success) {
                        setTrip(prevTrip => ({
                            ...prevTrip,
                            members: [...prevTrip.members, { email: emailInput }]
                        }));
                        setEmailInput("");
                    }
                })
                .catch(error => {
                    console.error(error.response);
                    if (error.response.status === 500) {
                        setErrorMessage('Error del servidor');
                    } else if (error.response.data.message === 'The email field must be a valid email address') {
                        setErrorMessage('Por favor, introduce un correo electrónico válido');
                    } else {
                        setErrorMessage('Error añadiendo acompañante');
                    }
                });
            setIsAddingMember(false);
        }
    }, [isAddingMember, id, emailInput, rdxToken]);
    const handleAddMembers = () => {
        setIsAddingMember(true);
    };

    return (
        trip ? (
            <div>
                <h1>Viaje a {trip.locations[0].name}</h1>
                <div className="dates-trip-detail">{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</div>
                <img className="location_image" src={trip.locations[0].image} alt={trip.locations[0].name} />

                <TripCalendar trip={trip} />

                <p>Número de viajeros: {trip.members_group}</p>
                <h2>Miembros del grupo:</h2>
                <input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button onClick={handleAddMembers}>Añadir viajero</button>
                {
                    trip.members.length > 0
                        ? (
                            <div className="trip-members">
                                {
                                    trip.members.map((member, index) => (
                                        <TripCardDetailMember
                                            key={index}
                                            name={member.name}
                                            email={member.email}
                                            image={member.image}
                                            tripId={id}
                                            userId={member.id}
                                            rdxToken={rdxToken}
                                        />
                                    ))
                                }
                            </div>
                        )
                        : (
                            <div>No hay miembros en el grupo</div>
                        )
                }
                <h2>Actividades:</h2>
                {console.log(trip.activities)}

                <div className="trip-detail-activities-container">
                    {
                        trip.activities.map((activity, index) => (
                            <ActivityCardDetail
                                key={index}
                                name={activity.name}
                                description={activity.description}
                                image_1={activity.image_1}
                                image_2={activity.image_2}
                                location={activity.location}
                                duration={activity.duration}
                            />
                        ))
                    }
                </div>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
}