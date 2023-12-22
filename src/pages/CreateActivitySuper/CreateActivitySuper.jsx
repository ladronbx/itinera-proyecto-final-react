import React, { useEffect, useState } from "react";
import "./CreateActivitySuper.css";
import { checker } from "../../services/checker";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { createActivity } from "../../services/apiCall";
import { jwtDecode } from 'jwt-decode';

export const CreateActivitySuper = () => {
    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (!rdxToken) {
            navigate("/");
        }
    }, []);

    const [elements, setElements] = useState({
        name: "",
        description: "",
        image_1: "",
        image_2: "",
        duration: "",
        location_id: "",
    });

    const [elementsError, setElementsError] = useState({
        nameError: "",
        descriptionError: "",
        image_1Error: "",
        image_2Error: "",
        durationError: "",
        location_idError: "",
    })

    const [message, setMessage] = useState("");

    const functionHandler = (e) => {
        setElements((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {
        let error = "";
        error = checker(e.target.name, e.target.value);

        setElementsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    };

useEffect(() => {
    if (rdxToken) {
        const decoded = jwtDecode(rdxToken);
        console.log('rdxToken:', rdxToken);
        console.log('decoded.role:', decoded.role);
        if (decoded.role !== "is_super_admin") {
            navigate("/");
        }
    } else {
        navigate("/");
    }
}, [rdxToken]);

const handleSubmit = (e) => {
    e.preventDefault();
    createActivity(elements, rdxToken)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => console.log(error));
};
    return (
        <div className="login-style-container-create-activity">
            <CustomInput
                design={"inputStyle"}
                type={"name"}
                name={"name"}
                placeholder={"Name"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />

            <CustomInput
                design={"inputStyle"}
                type={"description"}
                name={"description"}
                placeholder={"Description"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />

            <CustomInput
                design={"inputStyle"}
                type={"image_1"}
                name={"image_1"}
                placeholder={"Image 1"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />

            <CustomInput
                design={"inputStyle"}
                type={"image_2"}
                name={"image_2"}
                placeholder={"Image 2"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />

            <CustomInput
                design={"inputStyle"}
                type={"duration"}
                name={"duration"}
                placeholder={"Duration"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />

            <CustomInput
                design={"inputStyle"}
                type={"location_id"}
                name={"location_id"}
                placeholder={"Location ID"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <button onClick={handleSubmit}>Crear actividad</button>
        </div>
    )
}