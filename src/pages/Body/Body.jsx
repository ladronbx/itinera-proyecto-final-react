import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Activity } from '../Activity/Activity';
import { Trip } from '../Trip/Trip';
import { Profile } from '../Profile/Profile';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/activities" element={<Activity />}/>
                <Route path="/my-trips" element={<Trip />}/>
            </Routes>
         </>
     )
}