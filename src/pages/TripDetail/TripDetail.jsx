import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './TripDetail.css';
import { selectToken } from '../userSlice';
import { useSelector } from 'react-redux';
import { getMyTripById, addMemberToTrip, getActivityByLocationId, addActivityFromTrip } from "../../services/apiCall";
import { useParams } from "react-router-dom";
import { TripCardDetailMember } from "../../common/TripCardDetailMember/TripCardDetailMember";
import TripCalendar from "../../common/TripCalendar/TripCalendar";
import { ActivityCardDetail } from "../../common/ActivityCardDetail/ActivityCardDetail";
import { Modal } from 'antd';

export const TripDetail = () => {
    const rdxToken = useSelector(selectToken);
    const [trip, setTrip] = useState(null);
    const { id } = useParams();
    const [emailInput, setEmailInput] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [activitiesByLocation, setActivitiesByLocation] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState("");
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

    useEffect(() => {
        if (trip && rdxToken) {
            getActivityByLocationId(trip.locations[0].id, rdxToken)
                .then((response) => {
                    setActivitiesByLocation(response.data.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        navigate("/");
                    } else {
                        console.error('Error:', error);
                    };
                })
        }
    }, [trip, rdxToken, navigate]);

    const handleAddMembers = () => {
        setIsAddingMember(true);
    };

    const handleAddActivity = () => {
        const activityId = selectedActivity;
        const tripId = id;
        addActivityFromTrip(tripId, activityId, rdxToken)
            .then(response => {
                // console.log(response);
                getMyTripById(id, rdxToken)
                    .then((response) => {
                        setTrip(response.data.data);
                        Modal.success({
                            content: 'Actividad agregada con éxito',
                        });
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 404) {
                            navigate("/");
                        } else {
                            console.error('Error:', error);
                        };
                    })
            })
            .catch(error => {
                console.error('Error:', error);
                Modal.error({
                    content: 'Error al agregar actividad',
                });
            });
    };
    const handleMemberRemoved = () => {
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
    };

    const handleActivityRemoved = () => {
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
    };

    return (
        trip ? (
            <div className="trip-detail-style" >
                <div className="trip-detail-container-top">
                    <h1 className="title-trip-detail-style">Viaje a {trip.locations[0].name}</h1>
                    <div className="dates-trip-detail">Fecha de inicio : {new Date(trip.start_date).toLocaleDateString()}</div>
                    <div className="dates-trip-detail">  - Fecha de fin : {new Date(trip.end_date).toLocaleDateString()}</div>
                    <div className="trip-detail-image-container">
                        <img className="trip-detail-image" src={trip.locations[0].image_1} alt={trip.locations[0].name} />
                    </div>
                </div>
                <div className="trip-detail-description">{trip.locations[0].description_location}</div>
                <div className="trip-detail-description-calendar"><TripCalendar trip={trip} /></div>
                <h2 className="info-viajeros-style">Información del grupo de viaje:</h2>
                <div className="trip-detail-container-down">

                    <div className="viajeros-trip-detail">
                        <h3>Número total de viajeros: {trip.members_group}</h3>
                        <input className="style-input-trip-detail" type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <button className="add-viajero-button" onClick={handleAddMembers}>Añadir viajero</button>
                    </div>

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
                                                onMemberRemoved={handleMemberRemoved}
                                            />
                                        ))
                                    }
                                </div>
                            )
                            : (
                                <div>No hay miembros en el grupo</div>
                            )
                    }
                </div>
                <h2>Actividades:</h2>
                {/* {console.log(trip.activities)} */}

                {
                    <div>
                        <select name="activities" onChange={e => setSelectedActivity(e.target.value)}>
                            <option>Agrega actividades</option>
                            {
                                activitiesByLocation.map((activity, index) => (
                                    <option key={index} value={activity.id}>{activity.name}</option>
                                ))
                            }
                        </select>

                        <button onClick={handleAddActivity}>Añadir actividad</button>
                    </div>

                }

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
                                tripId={id}
                                activityId={activity.trip_activity_id}
                                rdxToken={rdxToken}
                                onActivityRemoved={handleActivityRemoved}
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