import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const connexion = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://api-node-ou4w.onrender.com/login', {
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
            localStorage.setItem('userId', data.user._id);
            navigate('/posts');
            
        } catch (err) {
            console.log(err);
            setError('erreur');          
        }
    }

    return <div className="card-connexion">
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
            { error && <p className="p-error">{error}</p> }
            <button type="submit">Se connecter</button>
        </form>
    </div>
}

export default Login;