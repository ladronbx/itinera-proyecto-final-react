import React, { useEffect, useState } from "react";
import "./TripSuper.css";
import { deleteTrip, getAllTrips } from "../../services/apiCall";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { jwtDecode } from 'jwt-decode';
import { TripCardSuper } from "../../common/TripCardSuper/TripCardSuper";

export const TripSuper = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      if (decoded.role === "is_super_admin") {
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
    } else {
      navigate("/");
    }
  }, [rdxToken]);

  const handleRemoveTripSuper = (id) => {
    deleteTrip(id, rdxToken)
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
              trips.map((trip, index) => (
                <TripCardSuper
                  key={index}
                  id={trip.id}
                  location={trip.location}
                  start_date={trip.start_date}
                  end_date={trip.end_date}
                  memberscount={trip.memberscount}
                  image_1={trip.image_1}
                  tripId={trip.id}
                  rdxToken={rdxToken}
                  onTripRemoved={() => handleRemoveTripSuper(trip.id)}
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