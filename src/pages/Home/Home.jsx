import React, { useEffect, useState } from "react";
import "./Home.css";
import { getAllLocations } from "../../services/apiCall";
import { useNavigate } from "react-router-dom";
import videoHome from "../../assets/img/img-home/video-home.mp4";
import { LinkButton } from "../../common/LinkButton/LinkButton";

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
          <source src={videoHome} type="video/mp4" />
        </video>
      </div>

      <LinkButton
        classButton={"link-button-style-home"}
        path={"/locations"}
        title={"Explora los destinos, y comienza aquí tu aventura"}
      />
    </div>
  );
};