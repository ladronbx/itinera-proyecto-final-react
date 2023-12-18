import React, { useEffect, useState } from "react";
import './TripDetail.css';
import { selectToken } from '../userSlice';
import { useSelector } from 'react-redux';
import { getMyTripById, addMemberToTrip } from "../../services/apiCall";
import { useParams } from "react-router-dom";
import { TripCardDetailMember } from "../../common/TripCardDetailMember/TripCardDetailMember";
import TripCalendar from "../../common/TripCalendar/TripCalendar";


export const TripDetail = () => {
    const rdxToken = useSelector(selectToken);
    const [trip, setTrip] = useState(null);
    const { id } = useParams();
    const [emailInput, setEmailInput] = useState("");
    const [isAddingMember, setIsAddingMember] = useState(false);

    if (!rdxToken) {
        navigate("/");
    }

    //si no le pertenece el viaje al usuario, sale loading... debería salir no tienes permisos para ver este viaje.
    useEffect(() => {
        if (id && rdxToken) {
            getMyTripById(id, rdxToken)
                .then((response) => {
                    setTrip(response.data.data);
                })
                .catch((error) => console.log(error));
        } else {
            navigate("/");
        }
    }, [id, rdxToken]);

    useEffect(() => {
        if (isAddingMember) {
            addMemberToTrip(id, emailInput, rdxToken)
                .then(response => {
                    if (response.data.success) {
                        // Actualizar la lista de miembros del viaje
                        setTrip(prevTrip => ({
                            ...prevTrip,
                            members: [...prevTrip.members, { email: emailInput }]
                        }));
                        // Limpiar el estado de emailInput
                        setEmailInput("");
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch(error => console.error('Error:', error));
            // Resetear la bandera
            setIsAddingMember(false);
        }
    }, [isAddingMember]);

    const handleAddMembers = () => {
        setIsAddingMember(true);
    };

    if (!trip) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Viaje a {trip.locations[0].name}</h1>
            <div className="dates-trip-detail">{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</div>
            <img className="location_image" src={trip.locations[0].image} alt={trip.locations[0].name} />

            <TripCalendar trip={trip} />

            <p>Número de viajeros: {trip.members_group}</p>
            <h2>Miembros del grupo:</h2>
            {/* TO DO : Input para añadir miembros al grupo */}
            <input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} />
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
            {trip.activities.map((activity, index) => (
                <div key={index}>
                    <p>Actividad: {activity.name}</p>
                    <img src={activity.image} alt={activity.name} />
                    <div>Duration : {activity.duration}H</div>
                </div>
            ))}
        </div>
    );
}