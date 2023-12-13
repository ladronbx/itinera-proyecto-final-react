import React, { useEffect, useState } from "react";
import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import imgProfile from "../../assets/img/img-profile.png";

export const Header = () => {
  const dispatch = useDispatch();
  const rdxToken = useSelector(selectToken);
  const [decodedToken, setDecodedToken] = useState(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (rdxToken) {
      try {
        const decoded = jwtDecode(rdxToken);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [rdxToken]);

  const logOutMe = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <div className="navbar-header-style">
      <div className="logo-container-header">
        <LinkButton
          classButton={"link-button-logo-style"}
          path={"/"}
          title={<img src={logo} alt="Logo" className="logo-image" />}
        />
      </div>

      <div className="navbar-container-header">
        <div className={`header-style ${menuOpened ? "menu-opened" : ""}`}>
          <div className="burger-icon" onClick={toggleMenu}>
            <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className={`link-buttons ${menuOpened ? "menu-links" : ""}`}>
            {rdxToken ? (
              <>
                <LinkButton
                  classButton={"link-button-style"}
                  path={"/my-trips"}
                  title={"Mis viajes"}
                />
                <LinkButton
                  classButton={"link-button-style-profile background-color-profile"}
                  path={"/profile"}
                  title={<img src={imgProfile} alt="Perfil" />}
                />

                {decodedToken && decodedToken.role === "super_admin" && (
                  <>
                    <LinkButton
                      classButton={"link-button-style"}
                      path={"/get-all-users"}
                      title={"Get all Users"}
                    />
                    <LinkButton
                      classButton={"link-button-style"}
                      path={"/trips"}
                      title={"Get all trips"}
                    />
                  </>
                )}

                <div onClick={logOutMe}>
                  <LogOutButton
                    classButton={"link-button-style"}
                    path={"/"}
                    title={"Log Out"}
                  />
                </div>

                {decodedToken && decodedToken.role === "super_admin" && (
                  <div className="superadmin-style">SUPER ADMIN</div>
                )}
              </>
            ) : (
              <>
                <LinkButton
                  classButton={"link-button-style"}
                  path={"/login"}
                  title={"Login"}
                />
                <LinkButton
                  classButton={"link-button-style"}
                  path={"/register"}
                  title={"Register"}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};