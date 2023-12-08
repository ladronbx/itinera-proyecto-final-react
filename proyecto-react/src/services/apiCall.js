import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/';

export const logUser = async (body) => {
    return await axios.post(`${BASE_URL}login`, body);
}

export const registerUser = async (body) => {
    return await axios.post(`${BASE_URL}register`, body);
}

export const getProfile = (rdxToken) => {
    return axios.get(`${BASE_URL}profile`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const updateProfile = (body, rdxToken) => {
    return axios.put(`${BASE_URL}profile-update`, body, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const deleteUser = (body, rdxToken) => {
    return axios.put(`${BASE_URL}user-delete`, body, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};


export const getAllLocations = async () => {
    return await axios.get(`${BASE_URL}locations`);
}

//se le pasa el id de la location por params   
export const getLocationById = async () => {
    return await axios.get(`${BASE_URL}/location`);
}

//se le pasa el id de la location por params
export const createPersonalTrip = (body, rdxToken) => {
    return axios.post(`${BASE_URL}/personal-trip-create/{id}`, body, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

export const getAllMyTrips = (rdxToken, page) => {
    return axios.get(`${BASE_URL}my-trips`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};









//superadmin
export const getAllUsers = (rdxToken, page) => {
    return axios.get(`${BASE_URL}super/get/all/users?page=${page}&skip=10`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

//se le pasa el id del trip por params
export const deleteTrip = async (id, token) => {
    return await axios.delete(`${BASE_URL}/trip-delete/{id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            id: id,
        },
    });
};