import { Routes, Route, Navigate } from 'react-router-dom';
// import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                {/* <Route path="/register" element={<Register />}/> */}
                <Route path="/profile" element={<Profile />}/>
            </Routes>
         </>
     )
}