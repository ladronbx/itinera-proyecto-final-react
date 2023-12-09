import React, { useEffect, useState } from "react";
import "./Home.css";
import { getAllLocations } from "../../services/apiCall";
import { useNavigate } from "react-router-dom";
import { LocationCard } from "../../common/LocationCard/LocationCard";


export const Home = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (locations || locations.length === 0) {
      getAllLocations()
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setTimeout(() => {
              setLocations(response.data.data);
            }, 200)
          }
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="cards-locations-container-main">
      <div className="container">
          {
            locations.length > 0
              ? (
                locations.map((location) => (
                  <div className="" key={location.id}>
                    <LocationCard
                      name={location.name}
                      description={location.description}
                      email={location.email}
                      image_1={location.image_1}
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