import React, { useEffect, useState } from "react";
import "./Location.css";
import { getAllLocations } from "../../services/apiCall";
import { useNavigate } from "react-router-dom";
import { LocationCard } from "../../common/LocationCard/LocationCard";
import { Modal } from 'antd';
import SelectDate from "../../common/SelectDate/SelectDate";

export const Location = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  const handleDestinationClick = (location) => {
    setSelectedLocation(location);
    Modal.confirm({
      title: 'Seleccione las fechas de su viaje',
      content: <SelectDate onDateChange={handleDateChange} />,
      onCancel: () => {},
      onOk: () => {},
    });
  };

  const handleDateChange = (dates) => {
    console.log(dates);
  };

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
                  <LocationCard
                    key={location.id}
                    name={location.name}
                    description={location.description}
                    email={location.email}
                    image_1={location.image_1}
                    onClick={() => handleDestinationClick(location)}
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