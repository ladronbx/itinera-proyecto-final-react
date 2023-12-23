import React, { useState, useEffect } from "react";
import "./LocationSuper.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CreateLocationSuper } from "../../common/CreateLocationSuper/CreateLocationSuper";
import { getAllLocationsSuper } from "../../services/apiCall";
import { LocationCard } from "../../common/LocationCard/LocationCard";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

export const LocationSuper = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [locations, setLocations] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const decoded = jwtDecode(rdxToken);
    if (rdxToken && decoded.role === "is_super_admin") {
      getAllLocationsSuper(rdxToken, currentPage)
        .then((res) => {
          if (Array.isArray(res.data.data) && res.data.data.length > 0) {
            setLocations(res.data.data)
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

  const handleLocationRemoved = () => {
    getAllLocationsSuper(rdxToken, currentPage)
      .then((res) => {
        setLocations(res.data.data)
      })
      .catch((err) => {
        console.log('err:', err);
      })
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="location-super-container-main">hola

      <CreateLocationSuper />
      <div className="container">

        <div className="pagination-container">
          <PaginationButton
            classPagination="previous-location"
            text={"<< Previous"}
            changePagination={() => handlePageChange(currentPage - 1)}
          />
          <PaginationButton
            classPagination="next-location"
            text={"Next >>"}
            changePagination={() => handlePageChange(currentPage + 1)}
          />
        </div>
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