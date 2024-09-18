import React, { useState } from 'react';

const Inscription = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inscriptionOk, setInscriptionOk] = useState('');
    const [errorInscription, setErrorInscription] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const inscription = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setErrorInscription('Le mot de passe doit être identique dans les deux champs.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/inscription', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if(response.ok) {
                setInscriptionOk('Inscription réussi avec succès, vous pouvez maintenant vous connecter !');
                setErrorInscription('');
                localStorage.setItem('token', data.token);
            } else {
                setErrorInscription(data.message || 'Erreur lors de l\'inscription.');
                setInscriptionOk('');
            }

        } catch (err) {
            setErrorInscription('Une erreur est survenu lors de l\'inscription.');
            setInscriptionOk('');
            console.log(err);
        }
    };

    return <>
        <form onSubmit={inscription}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="mot de passe"
                required />
            <input
                type='password' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='confirmez le mot de passe'
                required />
            <button type="submit">S'inscrire</button>
        </form>
        {inscriptionOk && <p>{inscriptionOk}</p>}
        {errorInscription && <p>{errorInscription}</p>}
        </>
};

export default Inscription;