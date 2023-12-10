import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

//Rdx escritura
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { checker } from "../../services/checker";
import { logUser } from "../../services/apiCall";
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rdxUserData = useSelector(selectToken);


    useEffect(() => {
        if (rdxUserData) {
            navigate("/");
        }
    }, []);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: ""
    });

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

    const [message, setMessage] = useState("");

    const logMe = () => {
        if (
            credentials.password !== "" &&
            credentials.email !== ""
        ) {
            logUser(credentials)
                .then((response) => {
                    const { message, token } = response.data;
                    setMessage(message);

                    if (message == "User logged in") {
                        dispatch(login(token))
                        navigate("/")
                    }
                })

                .catch(error => {
                    console.log(error);
                });
        };
    }

    return (
        <div className="login-style-container-main">
            <div className="login-style-container">
                <h2 className="title-login">Log In!</h2>
                <CustomInput
                    design={"input-style"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Email"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{credentialsError.emailError}</div>
                <CustomInput
                    design={"input-style"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{credentialsError.passwordError}</div>

                <div className='buttonLogin' onClick={logMe}>Log Me!</div>
            </div>

        </div>
    )
}