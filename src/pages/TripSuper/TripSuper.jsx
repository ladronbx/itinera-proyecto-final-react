import React, { useEffect, useState } from "react";
import "./TripSuper.css";
import { getAllTrips } from "../../services/apiCall";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { TripCard } from "../../common/TripCard/TripCard";
import { LinkButton } from "../../common/LinkButton/LinkButton";

export const TripSuper = () => {
  const rdxToken = useSelector(selectToken);

  if (!rdxToken) {
    navigate("/");
  }

  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (trips.length === 0) {
      getAllTrips(rdxToken)
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setTimeout(() => {
              setTrips(response.data.data);
            }, 200)
          }
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/");
    }
  }
    , []);

  const handleActivityRemoved = () => {
    getAllTrips(rdxToken)
    .then((response) => {
        setTrips(response.data.data);
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
    <div className="cards-trips-container-main">
      <div className="trip-style">
        {
          trips.length > 0
            ? (
              trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  id={trip.id}
                  location={trip.location}
                  start_date={trip.start_date}
                  end_date={trip.end_date}
                  memberscount={trip.memberscount}
                  image_1={trip.image_1}
                  tripId={trip.id}
                  rdxToken={rdxToken}
                  onTripRemoved={handleActivityRemoved}
                />
              ))
            )
            : (
              <div className="container-without-trips">
                <h1 className="without-trips-style">¡No tienes ningún viaje!</h1>
                <h1 className="without-trips-style">Comienza a planificar tu viaje</h1>

                {rdxToken ? (
                  <LinkButton
                    classButton={"link-button-style-home"}
                    path={"/locations"}
                    title={"Explora los destinos, y comienza aquí tu aventura"}
                  />
                ) : (
                  <>
                    <LinkButton
                      classButton={"link-button-style-home"}
                      path={"/login"}
                      title={"Explora los destinos, y comienza aquí tu aventura"}
                    />
                  </>
                )}
              </div>
            )
        }

      </div>
    </div>




  );
};