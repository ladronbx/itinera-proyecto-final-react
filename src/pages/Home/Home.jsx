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
    <div className="cards-locations-container-main home-style">
      <div className="video-background">
        <video autoPlay loop muted className="video-home">
          <source src="https://designerapp.officeapps.live.com/designerapp/Media.ashx/?id=36a621e9-3128-43a1-a25e-20d64377a3a0.mp4&fileToken=62cc45a4-132a-4ca8-bb1a-ba5ca63a5e08&dcHint=FranceCentral" type="video/mp4" />
        </video>
        
      </div>
      DESTINOS
      <div className="container" >
        {
          locations.length > 0
            ? (
              locations.slice(0, 3).map((location) => (
                <LocationCard
                  key={location.id}
                  name={location.name}
                  description={location.description}
                  email={location.email}
                  image_1={location.image_1}
                />
              ))
            )
            : (
              <div>Loading ...</div>
            )
        }
      </div>

      Actividades

      <div className="container" >
        {
          locations.length > 0
            ? (
              locations.slice(0, 3).map((location) => (
                <LocationCard
                  key={location.id}
                  name={location.name}
                  description={location.description}
                  email={location.email}
                  image_1={location.image_1}
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