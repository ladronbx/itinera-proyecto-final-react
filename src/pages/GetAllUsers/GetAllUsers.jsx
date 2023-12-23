import React, { useState, useEffect } from "react";
import "./GetAllUsers.css";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CardUser } from "../../common/CardUser/CardUser";
import { getAllUsers } from "../../services/apiCall";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

export const GetAllUsers = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [users, setusers] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      if (decoded.role === "is_super_admin") {
        getAllUsers(rdxToken, page)
          .then(
            user => {
              if (Array.isArray(user.data.data)) {
                setusers(user.data.data)
              } else {
                setPage(page - 1)
              }
            })
          .catch((error) => console.log(error));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [rdxToken, page]);

  const changePageUp = () => {
    setPage(page + 1)
  }

  const changePageDown = () => {
    if (page !== 0) {
      setPage(page - 1)
    }
  }

  const handleRemoveUser = () => {
    getAllUsers(rdxToken)
      .then(
        user => {
            setusers(user.data.data)
        })
      .catch((error) => console.log(error));
  }

  return (
    <div className="card-user-container-main">
    <div className="pagination-container">
      <PaginationButton
        classPagination="previous-user"
        text={"<< Previous"}
        changePagination={() => changePageDown()}
      />
      <PaginationButton
        classPagination="next-user "
        text={"Next >>"}
        changePagination={() => changePageUp()}
      />
    </div>
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
                  userId={user.id}
                  rdxToken={rdxToken}
                  onUserRemoved={handleRemoveUser}

                />
              ))}
            </div>
          ) : (
            <div>Loading ...</div>
          )}
    </div>
  );
};