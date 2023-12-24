import React, { useEffect, useState } from "react";
import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";
import { jwtDecode } from 'jwt-decode';
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
    if (rdxToken !== null) {
      if (rdxToken && typeof rdxToken === 'string') {
        try {
          const decoded = jwtDecode(rdxToken);
          setDecodedToken(decoded);
          if (decoded.exp < Date.now() / 1000) {
            dispatch(logout());
            navigate("/");
          }

        } catch (error) {
          console.error("Error decoding token:", error);
        }

      } else {
        navigate("/");
        dispatch(logout());
      }
    } else {
      navigate("/");
      dispatch(logout());
    }

  }, [rdxToken]);

  useEffect(() => {
    if (rdxToken && typeof rdxToken === 'string') {
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
  const headerClass = decodedToken && decodedToken.role === "is_super_admin" ? "navbar-header-style super-admin" : "navbar-header-style";
  return (
    <div className={headerClass}>
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

                  {decodedToken && decodedToken.role === "is_super_admin" && (
                    <>
                      <LinkButton
                        classButton={"link-button-style"}
                        path={"/trips"}
                        title={"All trips"}
                      />

                      <LinkButton
                        classButton={"link-button-style"}
                        path={"/users"}
                        title={"All users"}
                      />

                      <LinkButton
                        classButton={"link-button-style"}
                        path={"/activities-super"}
                        title={"Gestión actividades"}
                      />

                      <LinkButton
                        classButton={"link-button-style"}
                        path={"/locations-super"}
                        title={"Gestión location"}
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

                  {decodedToken && decodedToken.role === "is_super_admin" && (
                    <div className="superadmin-style">Panel de gestión</div>
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
    </div>
  );
};