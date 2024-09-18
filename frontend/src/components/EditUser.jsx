import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../services/userService";

const EditUser = ({ userId }) => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUser(userId);
                setUserData({ username: data.username, email: data.email, password: ''});
            } catch (err) {
                console.log(err);
                setError('erreur lors de la récupération des data users');
            }
        };
        fetchUserData();
    }, [userId]);

    const editProfil = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value});
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userId, userData);
            setSucces('profil édité avec succès !');
            setError('');
        } catch (err) {
            console.log(err);           
            setError('erreur lors de l édition du profil.')
        }
    };

    return <>
    <h1>Modifier votre profil</h1>
    {error && <p className="error">{error}</p>}
    {succes && <p className="success">{succes}</p>}
    <form onSubmit={submit}>
        <label>Pseudo :
            <input
            type="text"
            name="username"
            value={userData.username}
            onChange={editProfil}
            required
            />
          </label>
          <label>
          Email :
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={editProfil}
            required
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={editProfil}
            placeholder="Laisser vide si inchangé"
          />
        </label>
        <button type="submit">Mettre à jour</button>
    </form>
    </>
}

export default EditUser;