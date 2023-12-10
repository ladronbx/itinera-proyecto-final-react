import axios from 'axios';

// Obtén el token CSRF de la metaetiqueta
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Configura axios para incluir el token CSRF en las cabeceras de las solicitudes
axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

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
    return axios.delete(`${BASE_URL}user-delete`, body, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

//LOCATIONS
export const getAllLocations = async () => {
    return await axios.get(`${BASE_URL}locations`);
}

export const getLocationById = async (id) => {
    return await axios.get(`${BASE_URL}/location/${id}`);
}

//ACTIVITIES
export const getAllActivities = async () => {
    return await axios.get(`${BASE_URL}activities`);
}
export const getActivityById = async () => {
    return await axios.get(`${BASE_URL}activities/${id}`);
}

export const getActivityByLocationId = async (id) => {
    return await axios.get(`${BASE_URL}activities-location/${id}`);
}

//TRIPS
export const createPersonalTrip = (id, body, rdxToken) => {
    return axios.post(`${BASE_URL}/personal-trip-create/${id}`, body, {
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

//SUPERADMIN
export const getAllUsers = (rdxToken, page) => {
    return axios.get(`${BASE_URL}super/get/all/users?page=${page}&skip=10`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const deleteTrip = async (id, token) => {
    return await axios.delete(`${BASE_URL}/trip-delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            id: id,
        },
    });
};