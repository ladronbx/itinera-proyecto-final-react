import React, { useState, useEffect } from "react";
import "./ActivitySuper.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CreateActivitySuper } from "../../common/CreateActivitySuper/CreateActivitySuper";

export const ActivitySuper = () => {
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
    <div className="activity-super-container-main">hola

    <CreateActivitySuper />

      {
        // users.length > 0
        //   ? (

        //     <div className="activity-super-container">
        //     </div>
        //   ) : (
        //     <div>Loading ...</div>
        //   )
    }
    </div>
  );
};
