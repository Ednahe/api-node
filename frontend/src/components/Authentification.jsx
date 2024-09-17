import React, { useState } from "react";
import Login from "./Login";
import Inscription from "./Inscription";

const Authentification = () => {
    const [login, setLogin] = useState(true);

    const switchFormLoginConnexion = () => {
        setLogin(!login);
    };

    return <>
        {login ? <Login /> : <Inscription />}
        <button onClick={switchFormLoginConnexion}>
            {login ? "Pas encore de compte ? Inscrivez vous." : "Déjà un compte ? Connectez vous."}
        </button>
    </>
}

export default Authentification;