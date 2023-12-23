import React, { useState, useEffect } from "react";
import "./LocationSuper.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CreateLocationSuper } from "../../common/CreateLocationSuper/CreateLocationSuper";

export const LocationSuper = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      if (decoded.role === "is_super_admin") {
      console.log('rdxToken:', rdxToken);
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [rdxToken]);

  return (
    <div className="location-super-container-main">hola

    <CreateLocationSuper />

      {
        // users.length > 0
        //   ? (

        //     <div className="location-super-container">
        //     </div>
        //   ) : (
        //     <div>Loading ...</div>
        //   )
    }
    </div>
  );
};
