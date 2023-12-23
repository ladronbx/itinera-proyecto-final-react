import React, { useState, useEffect } from "react";
import "./ActivitySuper.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CreateActivitySuper } from "../../common/CreateActivitySuper/CreateActivitySuper";
import { getAllActivitiesSuper } from "../../services/apiCall";
import { ActivityCard } from "../../common/ActivityCard/ActivityCard";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

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
          if (Array.isArray(res.data.data) && res.data.data.length > 0) {
            setActivities(res.data.data)
          } else {
            setCurrentPage(currentPage - 1)
          }
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

        <div className="pagination-container">
          <PaginationButton
            classPagination="previous-activity"
            text={"<< Previous"}
            changePagination={() => handlePageChange(currentPage - 1)}
          />
          <PaginationButton
            classPagination="next-activity "
            text={"Next >>"}
            changePagination={() => handlePageChange(currentPage + 1)}
          />
        </div>

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

              </div>
            ) : (
              <div>Loading ...</div>
            )
        }
      </div>
    </div>
  );
};