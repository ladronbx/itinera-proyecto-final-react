import React, { useState, useEffect } from "react";
import "./GetAllUsers.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CardUser } from "../../common/CardUser/CardUser";
import { getAllUsers } from "../../services/apiCall";

export const GetAllUsers = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [users, setusers] = useState([])

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      if (decoded.role === "is_super_admin") {
        getAllUsers(rdxToken)
          .then(
            user => {
                setusers(user.data.data)
            })
          .catch((error) => console.log(error));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [rdxToken]);

  return (
    <div className="card-user-container-main">

      {
        users.length > 0
          ? (

            <div className="card-user-container">
              {users.map((user) => (
                <CardUser
                  key={user.id}
                  name={user.name}
                  image={user.image}
                  email={user.email}
                  is_active={user.is_active}
                  role_id={user.role_id}
                />
              ))}
            </div>
          ) : (
            <div>Loading ...</div>
          )}
    </div>
  );
};
