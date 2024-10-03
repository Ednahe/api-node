import React from "react";
import { deleteUser } from "../services/userService";
import { useNavigate } from "react-router";
import '../styles/delete-user.css';

const DeleteUser = ({ userId }) => {
    const navigate = useNavigate();

    const killUser = async () => {
        try {
            await deleteUser(userId);
            navigate('/');
        } catch (err) {
            console.error('erreur lors de la suppression du profil', err);
        }
    }

    return <div className="delete-user">
            <h2>Êtes-vous sûr de vouloir supprimer votre compte ?</h2>
            <button onClick={killUser}>Confirmer la suppression</button>
    </div>
};

export default DeleteUser;