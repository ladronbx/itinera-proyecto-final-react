import React, { useEffect, useState } from "react";
import "./Activity.css";
import { useNavigate } from "react-router-dom";
import { ActivityCard } from "../../common/ActivityCard/ActivityCard";
import { createTrip, getActivityByLocationId } from "../../services/apiCall";
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
    return () => {
      dispatch(resetActivities());
    };
  }, [dates, selectedLocation.id, navigate, rdxToken, dispatch]);

  const handleAddActivity = (activityId) => {
    console.log('Adding activity ID:', activityId);
    dispatch(addActivity(activityId));
  };


  const handleResetActivities = () => {
    dispatch(resetActivities());
  };

  useEffect(() => {
    console.log('Selected activities:', selectedActivities);
  }, [selectedActivities]);

  const handleCreateTrip = () => {
    if (!dates.start_date || !dates.end_date) {
      console.error('Start date or end date is missing');
      return;
    }
    
    const startDate = new Date(dates.start_date);
    const endDate = new Date(dates.end_date);
    
    if (isNaN(startDate) || isNaN(endDate)) {
      console.error('Start date or end date is invalid');
      return;
    }
    
    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`;
    const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;
    
    const tripData = {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      location_id: selectedLocation.id,
      activities: selectedActivities // Ya es un array de IDs de actividades
    };
  
    console.log('tripData:', tripData);
    createTrip(tripData, rdxToken)
      .then(response => {
        console.log('Trip created successfully:', response.data);
        navigate("/my-trips");
      })
      .catch(error => {
        console.error('Error creating trip:', error);
      });
  };

  return (
    <div className="cards-activities-container-main">
      <h2>¡Es hora de seleccionar las actividades que te gustaría realizar en {selectedLocation.name}!</h2>
      <button className="button-reset-activities" onClick={handleResetActivities}>Reiniciar actividades</button>
      <button className="button-select-activities" onClick={handleCreateTrip}>Ya tengo todas mis actividades CONTINUAR</button>
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
                    key={activity.id} // Añade esta línea
                    id={activity.id}
                    name={activity.name}
                    description={activity.description}
                    image_1={activity.image_1}
                    image_2={activity.image_2}
                    location={activity.location}
                    onClick={() => handleAddActivity(activity.id)}
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

      <button className="button-reset-activities" onClick={handleResetActivities}>Reiniciar actividades</button>
      <button className="button-select-activities" onClick={handleCreateTrip}>Ya tengo todas mis actividades CONTINUAR</button>
    </div>
  );
};