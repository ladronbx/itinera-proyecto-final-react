import React, { useState, useEffect } from "react";
import "./ActivitySuper.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CreateActivitySuper } from "../../common/CreateActivitySuper/CreateActivitySuper";
import { getAllActivitiesSuper } from "../../services/apiCall";
import { ActivityCard } from "../../common/ActivityCard/ActivityCard";

export const ActivitySuper = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([])
  const [currentPage, setCurrentPage] = useState(1); 
  useEffect(() => {
    const decoded = jwtDecode(rdxToken);
    if (rdxToken && decoded.role === "is_super_admin") {
      getAllActivitiesSuper(rdxToken, currentPage)
        .then((res) => {
          setActivities(res.data.data)
        })
        .catch((err) => {
          console.log('err:', err);
        })
    } else {
      navigate("/");
    }
  }, [rdxToken, currentPage]); 

  const handleActivityRemoved = () => {
    getAllActivitiesSuper(rdxToken, currentPage) 
      .then((res) => {
        setActivities(res.data.data)
      })
      .catch((err) => {
        console.log('err:', err);
      })
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="activity-super-container-main">hola

      <CreateActivitySuper />
      <div className="container">

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
                      isSuperAdmin={true}
                      rdxToken={rdxToken}
                      onActivityRemoved={handleActivityRemoved}
                    />
                  ))
                }
                <button onClick={() => handlePageChange(currentPage - 1)}>Previous page</button>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next page</button>
              </div>
            ) : (
              <div>Loading ...</div>
            )
        }
      </div>
    </div>
  );
};