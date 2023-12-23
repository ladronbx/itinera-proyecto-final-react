import React, { useState, useEffect } from "react";
import "./ActivitySuper.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CreateActivitySuper } from "../../common/CreateActivitySuper/CreateActivitySuper";
import { getAllActivities } from "../../services/apiCall";
import { ActivityCard } from "../../common/ActivityCard/ActivityCard";

export const ActivitySuper = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([])
  useEffect(() => {
    const decoded = jwtDecode(rdxToken);
    if (rdxToken && decoded.role === "is_super_admin") {
      getAllActivities(rdxToken)
        .then((res) => {
          setActivities(res.data.data)
        })
        .catch((err) => {
          console.log('err:', err);
        })
    } else {
      navigate("/");
    }
  }, [rdxToken]);

  return (
    <div className="activity-super-container-main">hola

      <CreateActivitySuper />

      {
        activities.length > 0
          ? (
            <div className="activity-super-container">
              {
                activities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    id={activity.id}
                    name={activity.name}
                    description={activity.description}
                    image_1={activity.image_1}
                    image_2={activity.image_2}
                    location={activity.location}
                  />
                ))
              }
            </div>
          ) : (
            <div>Loading ...</div>
          )
      }
    </div>
  );
};
