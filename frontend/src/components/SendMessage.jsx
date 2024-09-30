import React, { useState } from "react";
import '../styles/send-message.css';

const SendMessage = ({ messageSend }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [audio, setAudio] = useState(null);
    const [uploading, setUploading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim() && !audio) {
            setError('Le message ou le fichier audio ne peut pas être vide.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Vous devez être connecté pour envoyer un message.');
                return;
            }

            const formData = new FormData();
            formData.append('message', message);
            if (audio) {
                formData.append('audio', audio);
            }

            setUploading(true);

            const response = await fetch('http://localhost:5000/post', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Erreur lors de l\'envoi du message.');
                return;
            }

            const newPost = await response.json();
            messageSend(newPost);
            setMessage('');
            setAudio(null);
            setError('');

        } catch (err) {
            console.log(err);
            setError('Erreur lors de l\'envoi du message.');
        } finally {
            setUploading(false);
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
                <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0])} />
                <button type="submit" disabled={uploading}>Envoyer</button>
            </form>
            {error && <p>{error}</p>}
            {uploading && <p>En cours d'envoi ...(environ une dizaine de secondes).</p>}
    </div>
}

export default SendMessage;