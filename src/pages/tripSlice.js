import { createSlice } from '@reduxjs/toolkit';

export const tripSlice = createSlice({
    name: "trip",
    initialState: {
      tripId: null,
      location: null,
      dates: null,
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
    },
  });
  
  export const selectTripId = (state) => state.trip.tripId;
  export const selectLocation = (state) => state.trip.location;
  export const selectDates = (state) => state.trip.dates;
  export const { setTripId, setLocation, setDates } = tripSlice.actions;
  export default tripSlice.reducer;