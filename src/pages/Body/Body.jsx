import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Activity } from '../Activity/Activity';
import { Trip } from '../Trip/Trip';
import { Profile } from '../Profile/Profile';
import { Location } from '../Location/Location';
import { TripDetail } from '../TripDetail/TripDetail';
import { TripSuper } from '../TripSuper/TripSuper';
import { GetAllUsers } from '../GetAllUsers/GetAllUsers';
import { CreateActivitySuper } from '../CreateActivitySuper/CreateActivitySuper';
import { CreateLocationSuper } from '../CreateLocationSuper/CreateLocationSuper';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/locations" element={<Location />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/activities-location/:id" element={<Activity />}/>
                <Route path="/my-trips" element={<Trip />}/>
                <Route path="/trips" element={<TripSuper />}/>
                <Route path='/my-trip/:id' element={<TripDetail />}/>
                <Route path='/users' element={<GetAllUsers />}/>
                <Route path="/activity-create" element={<CreateActivitySuper/>}/>
                <Route path="/location-create" element={<CreateLocationSuper/>}/>
            </Routes>
         </>
     )
}