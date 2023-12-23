import axios from 'axios';
import e from 'cors';

// to do : averiguar si es necesario o no en mi caso

// Configura axios para incluir el token CSRF en las cabeceras de las solicitudes
// Obtén el token CSRF de la metaetiqueta
// const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// Configura axios para incluir el token CSRF en las cabeceras de las solicitudes
// axios.defaults.headers.common['X-CSRF-TOKEN'] = token;


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
    return axios.put(`${BASE_URL}update-profile`, body, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const updatePassword = (body, rdxToken) => {
    return axios.put(`${BASE_URL}update-password`, body, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const countDelete = (rdxToken) => {
    return axios.delete(`${BASE_URL}count-delete`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const getAllLocations = async (rdxToken) => {
    return axios.get(`${BASE_URL}locations`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

//ACTIVITIES
export const getActivityByLocationId = (id, rdxToken) => {
    return axios.get(`${BASE_URL}activities-location/${id}`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const deleteActivityFromTrip = (tripId, activityId, rdxToken) => {
    return axios.delete(`${BASE_URL}activities-my-trip/${tripId}/activity/${activityId}`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

export const addActivityFromTrip = (tripId, activityId, rdxToken) => {
    return axios.post(`${BASE_URL}activities-add-my-trip/${tripId}/${activityId}`, {}, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

//TRIPS
export const createTrip = (tripData, rdxToken) => {
    return axios.post(`${BASE_URL}create-trip`, tripData, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const addMemberToTrip = (tripId, email, rdxToken) => {
    return axios.post(`${BASE_URL}my-trip/${tripId}/add-member`, { email }, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const deleteMemberFromTrip = (tripId, userId, rdxToken) => {
    return axios.delete(`${BASE_URL}my-trip/${tripId}/delete-member/${userId}`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const getAllMyTrips = (rdxToken) => {
    return axios.get(`${BASE_URL}my-trips`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const getMyTripById = (id, rdxToken) => {
    return axios.get(`${BASE_URL}my-trip/${id}`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};

export const deleteMyTripById = (id, rdxToken) => {
    return axios.delete(`${BASE_URL}my-trip/${id}`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

//SUPERADMIN
export const getAllTrips = (rdxToken) => {
    return axios.get(`${BASE_URL}trips`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

export const getAllUsers = (rdxToken) => {
    return axios.get(`${BASE_URL}users`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

export const deleteTrip = (id, rdxToken) => {
    return axios.delete(`${BASE_URL}trip-delete/${id}`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

export const createActivity = (body, rdxToken) => {
    return axios.post(`${BASE_URL}activity-create`, body, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

export const createLocation = (body, rdxToken) => {
    return axios.post(`${BASE_URL}location-create`, body, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}



export const getAllActivities = (rdxToken) => {
    return axios.get(`${BASE_URL}activities`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}

export const deleteActivity = (id, rdxToken) => {
    return axios.delete(`${BASE_URL}activity-remove/${id}`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
}



//no la he usado 
export const getMembersTrip = (tripId, rdxToken) => {
    return axios.get(`${BASE_URL}my-trip/${tripId}/get-members`, {
        headers: {
            Authorization: `Bearer ${rdxToken}`,
        },
    });
};