import React, { useState } from "react";
import Login from "./Login";
import Inscription from "./Inscription";
import '../styles/auth.css';

const Authentification = () => {
    const [login, setLogin] = useState(true);

    const switchFormLoginConnexion = () => {
        setLogin(!login);
    };

    return <div className="contain-auth">
        {login ? <Login /> : <Inscription />}
        <div className="contain-btn-connect">
            <button onClick={switchFormLoginConnexion}>
                {login ? "Pas encore de compte ? Inscrivez vous." : "Déjà un compte ? Connectez vous."}
            </button>
        </div>
    </div>
}

export default Authentification;