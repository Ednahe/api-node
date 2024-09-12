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
            {login ? "Inscrivez vous" : "Connectez vous"}
        </button>
    </>
}

export default Authentification;