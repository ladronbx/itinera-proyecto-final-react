import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../pages/userSlice'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import tripSlice from '../pages/tripSlice'

const reducers = combineReducers({
    user: userSlice,
    trip: tripSlice,
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['register2']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});
















// import { configureStore } from '@reduxjs/toolkit'
// import userSlice  from '../pages/userSlice'
// import { combineReducers } from 'redux'
// import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist'
// import thunk from 'redux-thunk'
// import tripSlice from '../pages/tripSlice'

// const reducers = combineReducers({
//     user: userSlice,
//     trip: tripSlice,
// })

// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, reducers);


//Antes
// export default configureStore({
//     reducer: persistedReducer,
//     middleware: [thunk]
// });


//Ahora...
// export default configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });