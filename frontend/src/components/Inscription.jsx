import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const inscription = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/inscription', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/posts');

        } catch (err) {
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
                placeholder="Password"
                required />
            <button type="submit">S'inscrire</button>
        </form>
        </>
};

export default Inscription;