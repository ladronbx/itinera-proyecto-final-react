import React, { useEffect, useState } from "react";
import "./Activity.css";
import { useNavigate } from "react-router-dom";
import { ActivityCard } from "../../common/ActivityCard/ActivityCard";
import { getActivityByLocationId } from "../../services/apiCall";
import { selectToken } from "../userSlice";
import { selectDates, selectLocation } from "../tripSlice";
import { useSelector } from 'react-redux';

export const Activity = () => {
  const rdxToken = useSelector(selectToken);
  const selectedLocation = useSelector(selectLocation);
  const dates = useSelector(selectDates);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (dates && selectedLocation.id) {
      getActivityByLocationId(selectedLocation.id, rdxToken)
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setTimeout(() => {
              setActivities(response.data.data);
            }, 200)
          }
        })
    } else {
      console.log("Redirigiendo a la página de inicio");
      navigate("/");
    }
  }, [dates, selectedLocation.id, navigate, rdxToken]);

  return (
    <div className="cards-activities-container-main">
      <div className="container">
        {
          activities.length > 0
            ? (
              activities.map((activity, index) => (
                <div key={index} className="container-activities">
                  <ActivityCard
                    name={activity.name}
                    description={activity.description}
                    image_1={activity.image_1}
                    image_2={activity.image_2}
                    location={activity.location}
                  />
                </div>
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