import { createSlice } from '@reduxjs/toolkit';

export const tripSlice = createSlice({
    name: "trip",
    initialState: {
      tripId: null,
      location: null,
      dates: null,
      activities: [],
    },
    reducers: {
      setTripId: (state, action) => {
        state.tripId = action.payload;
      },
      setLocation: (state, action) => {
        state.location = action.payload;
      },
      setDates: (state, action) => {
        state.dates = action.payload;
      },
      addActivity: (state, action) => {
        state.activities.push(action.payload);
      },
    },
  });
  
  export const selectTripId = (state) => state.trip.tripId;
  export const selectLocation = (state) => state.trip.location;
  export const selectDates = (state) => state.trip.dates;
  export const selectActivities = (state) => state.trip.activities; 
  export const { setTripId, setLocation, setDates, addActivity } = tripSlice.actions;
  export default tripSlice.reducer;