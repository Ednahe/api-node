import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const connexion = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'erreur de connexion');
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/posts');
        } catch (err) {
            console.log(err);
            setError('erreur');          
        }
    }

    return <>
        <form onSubmit={connexion}>
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
                placeholder="Password"
                required />
            <button type="submit">Se connecter</button>
        </form>
        { error && <p>{error}</p> }
    </>
}

export default Login;