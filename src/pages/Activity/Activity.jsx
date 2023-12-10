import React, { useEffect, useState } from "react";
import "./Activity.css";
import { useNavigate } from "react-router-dom";
import { ActivityCard } from "../../common/ActivityCard/ActivityCard";
import { getAllActivities } from "../../services/apiCall";

export const Activity = () => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (activities.length === 0) {
        getAllActivities()
          .then((response) => {
            if (Array.isArray(response.data.data)) {
              setTimeout(() => {
                setActivities(response.data.data);
              }, 200)
            }
          })
          .catch((error) => console.log(error));
      } else {
        navigate("/");
      }
    }, []);


    return (
        <div className="cards-activities-container-main">
            <div className="container">
                {
                    activities.length > 0
                        ? (
                            activities.map((activity) => (
                                <div className="" key={activity.id}>
                                    <ActivityCard
                                        name={activity.name}
                                        description={activity.description}
                                        email={activity.email}
                                        image_1={activity.image_1}
                                        image_2={activity.image_2}
                                        location_id={activity.location_id}
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
}