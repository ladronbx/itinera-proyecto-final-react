import React, { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { checker } from "../../services/checker";

//Rdx escritura
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { logUser, registerUser } from "../../services/apiCall";
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rdxUserData = useSelector(selectToken);

  useEffect(() => {
    if (rdxUserData) {
      navigate("/");
    }
  }, []);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    image: ""
  });

  const [credentialsError, setCredentialsError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    imageError: ""
  })

  const [message, setMessage] = useState("");

  const functionHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = checker(e.target.name, e.target.value);

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  };

  const imageDefault = (image) => (image === "" ? undefined : image);

  const SignUp = () => {
    if (
      credentials.name !== "" &&
      credentials.password !== "" &&
      credentials.email !== ""
    ) {
      const credentialsWithNumber = {
        ...credentials,
        image: imageDefault(credentials.image),
      };
      registerUser(credentialsWithNumber)
        .then((response) => {
          const { message } = response.data;
          setMessage(message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  
  useEffect(() => {
    if (message === "User registered") {
      logUser(credentials)
        .then((response) => {
          const { message, token } = response.data;
          setMessage(message);
          if (message === "User registered") {
            dispatch(login(token));
            navigate("/");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [message]);
  return (
    <div className="login-style-container-main">
      <div className="register-style-container"> 
        <h2 className="title-login">Sign Up!</h2> 

        <CustomInput
          design={"inputStyle"}
          type={"name"}
          name={"name"}
          placeholder={"Name"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.nameError}</div>

        <CustomInput
          design={"inputStyle"}
          type={"email"}
          name={"email"}
          placeholder={"Email"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.emailError}</div>

        <CustomInput
          design={"inputStyle"}
          type={"password"}
          name={"password"}
          placeholder={"Password"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.passwordError}</div>

        <CustomInput
          design={"inputStyle"}
          type={"text"}
          name={"image"}
          placeholder={"URL image"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.imageError}</div>

        <div className='buttonLogin' onClick={SignUp}>Sign Up</div>
        <p>{message}</p>
      </div>
    </div>
  );
};
