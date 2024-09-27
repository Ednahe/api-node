import React, { useState } from "react";
import '../styles/send-message.css';

const SendMessage = ({ messageSend }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('Le message ne peut pas être vide.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Vous devez être connecté pour envoyer un message.');
                return;
            }

            const response = await fetch('http://localhost:5000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Erreur lors de l\'envoi du message.');
                return;
            }

            const newPost = await response.json();
            messageSend(newPost);
            setMessage('');

        } catch (err) {
            console.log(err);
            setError('Erreur lors de l\'envoi du message.');
        }
    }

    const enterSubmit = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    }

    return <div className="send-message">
            <form onSubmit={sendMessage}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={enterSubmit}
                    placeholder="Votre message (500 caractères maximum)"
                    required
                    maxLength={500}
                ></textarea>
                <button type="submit">Envoyer</button>
            </form>
            {error && <p>{error}</p>}
    </div>
}

export default SendMessage;