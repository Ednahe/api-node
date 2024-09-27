import React, { useState } from "react";
import { editPost } from "../services/postService";

const EditPost = ({ post, update, cancel }) => {
    const [message, setMessage] = useState(post.message);
    const [error, setError] = useState('');

    const edit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('veuillez éditer votre message.');
            return;
          }

        try {
            const token = localStorage.getItem('token');

            if(!token) {
                setError('erreur, veuillez vous connecter');
                return;
            }

            const updatePost = await editPost(post._id, { message }, token);
            setError('');
            update(updatePost);

        } catch (err) {
            console.log(err);           
        }
    }

    const enterSubmit = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            edit(e);
        }
    }

    return <>
        <form onSubmit={edit}>
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={enterSubmit}
                placeholder="Modifier votre message"
                maxLength={500}
            ></textarea>
            <button type="submit">Modifier</button>
            <button type="button" onClick={cancel}>Annuler</button>
        </form>
        {error && <p>{error}</p>}
    </>
}

export default EditPost;