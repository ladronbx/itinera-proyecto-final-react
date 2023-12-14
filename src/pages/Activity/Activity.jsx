import React, { useEffect, useState } from "react";
import "./Activity.css";
import { useNavigate } from "react-router-dom";
import { ActivityCard } from "../../common/ActivityCard/ActivityCard";
import { getActivityByLocationId } from "../../services/apiCall";
import { selectToken } from "../userSlice";
import { addActivity, selectActivities, selectLocation, selectDates, resetActivities } from '../../pages/tripSlice';
import { useSelector, useDispatch } from 'react-redux';

export const Activity = () => {
  const rdxToken = useSelector(selectToken);
  const selectedLocation = useSelector(selectLocation);
  const dates = useSelector(selectDates);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedActivities = useSelector(selectActivities);

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

  const handleAddActivity = (activity) => {
    console.log('Adding activity:', activity);
    dispatch(addActivity(activity));
  };

  const handleResetActivities = () => {
    dispatch(resetActivities());
  };

  useEffect(() => {
    console.log('Selected activities:', selectedActivities);
  }, [selectedActivities]);

  return (
    <div className="cards-activities-container-main">
      <button onClick={handleResetActivities}>Reiniciar actividades</button>
      <div className="container container-activities">
        {
          activities.length > 0
            ? (
              activities.map((activity) => {
                let isSelected = false;
                for (let i = 0; i < selectedActivities.length; i++) {
                  if (selectedActivities[i].id === activity.id) {
                    isSelected = true;
                    break;
                  }
                }
              
                return (
                  <ActivityCard
                    key={activity.id}
                    name={activity.name}
                    description={activity.description}
                    image_1={activity.image_1}
                    image_2={activity.image_2}
                    location={activity.location}
                    onClick={() => handleAddActivity(activity)}
                    isSelected={isSelected}
                  />
                );
              })
            )
            : (
              <div>Loading ...</div>
            )
        }
      </div>
    </div>
  );
};