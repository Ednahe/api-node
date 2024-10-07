import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../services/userService";
import DeleteUser from "./DeleteUser";
import "../styles/edit-user.css";

const EditUser = ({ userId }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [deleteProfil, setDeleteProfil] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(userId);
        setUserData({
          username: data.username,
          email: data.email,
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.log(err);
        setError("erreur lors de la récupération des data users");
      }
    };
    fetchUserData();
  }, [userId]);

  const editProfil = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (userData.password && userData.password !== userData.confirmPassword) {
      setError("les mots de passe doivent être identique");
      return;
    }

    try {
      const { confirmPassword, ...updateData } = userData;

      for (const key in updateData) {
        if (updateData[key] === "") {
          delete updateData[key];
        }
      }

      await updateUser(userId, updateData);
      setSucces("profil édité avec succès !");
      setError("");
    } catch (err) {
      console.log(err);
      setError("erreur lors de l édition du profil.");
    }
  };

  return (
    <div className="card-connexion card-edit-user">
      {deleteProfil ? (
        <DeleteUser userId={userId} />
      ) : (
        <form onSubmit={submit}>
          <h1 className="title-edit">Modifier votre profil</h1>
          <label className="label-edit">
            Pseudo :
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={editProfil}
              required
            />
          </label>
          <label className="label-edit">
            Email :
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={editProfil}
              required
            />
          </label>
          <label className="label-edit">
            Mot de passe :
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={editProfil}
              placeholder="Laisser vide si inchangé"
            />
          </label>
          <label className="label-edit">
            Confirmer mot de passe :
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={editProfil}
              placeholder="Laisser vide si inchangé"
            />
          </label>
          {error && <p className="error">{error}</p>}
          {succes && <p className="success">{succes}</p>}
          <button type="submit">Mettre à jour</button>
          <button type="button" onClick={() => setDeleteProfil(true)}>
            Supprimer le compte
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUser;