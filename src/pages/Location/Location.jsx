import React, { useEffect, useState } from "react";
import { getAllLocations } from "../../services/apiCall";
import { useNavigate } from "react-router-dom";
import { LocationCard } from "../../common/LocationCard/LocationCard";
import { Modal } from 'antd';
import SelectDate from "../../common/SelectDate/SelectDate";
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setDates, selectLocation, selectDates } from '../tripSlice';
import { selectToken } from "../userSlice";

export const Location = () => {
  const rdxToken = useSelector(selectToken);
  const selectedLocation = useSelector(selectLocation);
  const dates = useSelector(selectDates);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (rdxToken || locations) {
      getAllLocations(rdxToken)
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setTimeout(() => {
              console.log("Ubicaciones obtenidas: ", response.data.data);
              setLocations(response.data.data);
            }, 200)
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Redirigiendo a la página de inicio");
      navigate("/");
    }
  }, [rdxToken, navigate]);

  const handleDestinationClick = (location) => {
    console.log("ID de la ubicación seleccionada: ", location.id); 
    dispatch(setLocation(location));
    Modal.confirm({
      title: 'Seleccione las fechas de su viaje',
      content: <SelectDate onDateChange={handleDateChange} />,
      onCancel: () => { },
      onOk: handleOk,
    });
  };

  const handleDateChange = (dates) => {
    dispatch(setDates(dates));
  };

  const handleOk = async () => {
    if (selectedLocation.id && dates) {
      await dispatch(setDates(dates));
      navigate(`/activities-location/${selectedLocation.id}`);
    }
  };

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