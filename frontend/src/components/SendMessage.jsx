import React, { useState } from "react";
import '../styles/send-message.css';
import io from 'socket.io-client';

const socket = io('https://api-node-ou4w.onrender.com');

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

            const response = await fetch('https://api-node-ou4w.onrender.com/post', {
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

            socket.emit('sendMessage', newPost);

            messageSend(newPost);
            setMessage('');
            setAudio(null);
            setError('');

        } catch (err) {
            console.log(err);
            setError('Erreur lors de l\'envoi du message, seuls les fichiers faisant moins de 20 Mo sont autorisés..');
            
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
            {error && <p className="p-error">{error}</p>}
            {uploading && <p className="p-error">En cours d'envoi ...(cela peut prendre quelques secondes).</p>}
    </div>
}

export default SendMessage;