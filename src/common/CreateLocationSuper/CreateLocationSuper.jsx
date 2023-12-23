import React, { useEffect, useState } from "react";
import "./CreateLocationSuper.css";
import { checker } from "../../services/checker";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { jwtDecode } from 'jwt-decode';
import { createLocation } from "../../services/apiCall";
import { selectToken } from "../../pages/userSlice";
import { Modal, message } from 'antd';

export const CreateLocationSuper = () => {
    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
        image_3: "",
    });

    const [elementsError, setElementsError] = useState({
        nameError: "",
        descriptionError: "",
        image_1Error: "",
        image_2Error: "",
        image_3Error: "",
    });

    const functionHandler = (e) => {
        setElements((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {
        let error = "";
        if (e.target.name !== "image_1" && e.target.name !== "image_2" && e.target.name !== "image_3") {
            error = checker(e.target.name, e.target.value);
        }
        
        setElementsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    };

    useEffect(() => {
        if (rdxToken) {
            const decoded = jwtDecode(rdxToken);
            if (decoded.role !== "is_super_admin") {
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [rdxToken]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!elements.name || !elements.description) {
            setErrorMessage("Por favor, completa todos los campos requeridos.");
            return;
        }

        createLocation(elements, rdxToken)
            .then((response) => {
                console.log(response);
                setIsModalVisible(true);
            })
            .catch((error) => {
                console.log(error);
                message.error('Hubo un error al crear la ubicación.');
            });
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
            <div className='error-style'>{elementsError.nameError}</div>

            <CustomInput
                design={"inputStyle"}
                type={"description"}
                name={"description"}
                placeholder={"Description"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='error-style'>{elementsError.descriptionError}</div>

            <CustomInput
                design={"inputStyle"}
                type={"image_1"}
                name={"image_1"}
                placeholder={"Image 1"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='error-style'>{elementsError.image_1Error}</div>

            <CustomInput
                design={"inputStyle"}
                type={"image_2"}
                name={"image_2"}
                placeholder={"Image 2"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='error-style'>{elementsError.image_2Error}</div>

            <CustomInput
                design={"inputStyle"}
                type={"image_3"}
                name={"image_3"}
                placeholder={"Image 3"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='error-style'>{elementsError.image_3Error}</div>

            <button onClick={handleSubmit}>Crear ubicación</button>
            <Modal title="Ubicación creada" visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
                <p>La ubicación se ha creado con éxito.</p>
            </Modal>
            {
                errorMessage && <p className="error-message">{errorMessage}</p>
            }
        </div>
    )
}