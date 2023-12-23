import React, { useState, useEffect } from "react";
import "./LocationSuper.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CreateLocationSuper } from "../../common/CreateLocationSuper/CreateLocationSuper";
import { getAllLocationsSuper } from "../../services/apiCall";
import { LocationCard } from "../../common/LocationCard/LocationCard";

export const LocationSuper = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const decoded = jwtDecode(rdxToken);
    if (rdxToken && decoded.role === "is_super_admin") {
      getAllLocationsSuper(rdxToken)
        .then((res) => {
          setLocations(res.data.data)
        })
        .catch((err) => {
          console.log('err:', err);
        })
    } else {
      navigate("/");
    }
  }, [rdxToken]);

  const handleLocationRemoved = () => {
    getAllLocationsSuper(rdxToken)
      .then((res) => {
        setLocations(res.data.data)
      })
      .catch((err) => {
        console.log('err:', err);
      })
  };


  return (
    <div className="location-super-container-main">hola

      <CreateLocationSuper />
      <div className="container">
        {
          locations.length > 0
            ? (
              locations.map((location) => (
                <LocationCard
                  key={location.id}
                  id={location.id}
                  name={location.name}
                  description={location.description}
                  email={location.email}
                  image_1={location.image_1}
                  locatioId={location.id}
                  isSuperAdmin={true}
                  rdxToken={rdxToken}
                  onLocationRemoved={handleLocationRemoved}
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
