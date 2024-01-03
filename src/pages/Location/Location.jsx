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
  const [okClicked, setOkClicked] = useState(false);

  useEffect(() => {
    if (rdxToken || locations) {
      getAllLocations(rdxToken)
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
  }, [rdxToken, navigate]);

  const handleDestinationClick = (location) => {
    dispatch(setLocation(location));
    Modal.confirm({
      title: 'Seleccione las fechas de su viaje',
      content: <SelectDate dates={dates} onDateChange={(dates) => handleDateChange(dates, location)} />,
      onCancel: () => { },
      onOk: () => handleOk(location),
    });
  };

  const [localDates, setLocalDates] = useState({ start_date: null, end_date: null });

  let dateObjects;

  const handleDateChange = (dates, location) => {
    dateObjects = {
      start_date: dates.start_date ? format(new Date(dates.start_date), 'yyyy-MM-dd') : null,
      end_date: dates.end_date ? format(new Date(dates.end_date), 'yyyy-MM-dd') : null
    };
    setLocalDates(dateObjects);
  };

  const handleOk = async (location) => {
    if (location.id && dateObjects.start_date && dateObjects.end_date) {
      await dispatch(setDates(dateObjects));
      setOkClicked(true);
      navigate(`/activities-location/${selectedLocation.id}`);
      setOkClicked(false);
    }
  };

  return (
    <div className="cards-locations-container-main">
      <div className="container-location">
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
                  image_2={location.image_2}
                  image_3={location.image_3}
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