import React, { useEffect, useState } from "react";
import { getAllLocations } from "../../services/apiCall";
import { useNavigate } from "react-router-dom";
import { LocationCard } from "../../common/LocationCard/LocationCard";
import { Modal } from 'antd';
import SelectDate from "../../common/SelectDate/SelectDate";
import { setLocation, setDates, selectLocation, selectDates } from '../tripSlice';
import { selectToken } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';

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
              // console.log("ubicciones: ", response.data.data);
              setLocations(response.data.data);
            }, 200)
          }
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/");
    }
  }, [rdxToken, navigate]);

  const handleDestinationClick = (location) => {
    // console.log("id de lea ubicación seleccionada: ", location.id);
    dispatch(setLocation(location));
    Modal.confirm({
      title: 'Seleccione las fechas de su viaje',
      content: <SelectDate dates={dates} onDateChange={(dates) => handleDateChange(dates, location)} />,
      onCancel: () => { },
      onOk: () => handleOk(location),
    });
  };

  const handleDateChange = (dates, location) => {
    console.log('dates:', dates);
    const dateObjects = {
      start_date: dates.start_date ? new Date(dates.start_date) : null,
      end_date: dates.end_date ? new Date(dates.end_date) : null
    };
    dispatch(setDates(dateObjects));
  };
  
  const handleOk = async (location) => {
    console.log('dates:', dates);
    if (location.id && dates) {
      const formattedDates = {
        start_date: dates.start_date,
        end_date: dates.end_date
      };
      await dispatch(setDates(formattedDates));
      navigate(`/activities-location/${location.id}`);
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