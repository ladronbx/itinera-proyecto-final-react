import { createSlice } from '@reduxjs/toolkit';

export const tripSlice = createSlice({
    name: "trip",
    initialState: {
        tripId: null
    },
    reducers: {
        tripId: (state, action) => {
            state.tripId = action.payload; 
        },
    }
});

export const selecttripId = (state) => state.trip.tripId;
export const { tripId } = tripSlice.actions;
export default tripSlice.reducer;