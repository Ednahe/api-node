import React from "react";
import { useNavigate } from 'react-router-dom';
import { logout } from "../services/userService";

const Logout = () => {
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                await logout(userId);
            }

            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            navigate('/');
        } catch (err) {
            console.error('erreur pendant la deconnexion', err);            
        };
    }

    return <>
        <button onClick={logoutUser}>Se déconnecter</button>
    </>
}

export default Logout;