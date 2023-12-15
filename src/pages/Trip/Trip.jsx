import React, { useEffect, useState } from "react";
import "./Trip.css";
import { getAllMyTrips } from "../../services/apiCall";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { TripCard } from "../../common/TripCard/TripCard";

export const Trip = () => {
  const rdxToken = useSelector(selectToken);

  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (trips.length === 0) {
      getAllMyTrips(rdxToken)
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

    console.log(trips);
  return (
    <div className="cards-trips-container-main">
      <div className="container">
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
                  membersCount={trip.membersCount}
                />
              ))
            )
            : (
              <div>Loading ...</div>
            )
        }
      </div>
    </div>
  );
};