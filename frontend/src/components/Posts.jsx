import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/postService";
import SendMessage from "./SendMessage";
import EditPost from "./EditPost";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                console.log('data :', data);                
                setPosts(data);
            } catch(err) {
                console.log(err.message);
            }
        };

        fetchPosts();
    }, []);

    console.log("localStorage:", localStorage.getItem('userId'));

    const newMessage = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const editMessage = (postId) => {
        setEditPost(postId);
    };

    const deleteMessage = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            console.log("token :", token);
            await deletePost(postId, token);
            setPosts(posts.filter((post) => post._id !== postId));

        } catch (err) {
            console.log(err);            
        }
    };

    const updateMessage = (update) => {
        setPosts(posts.map((post) => (post._id === update._id ? update : post)));
        setEditPost(null);
    };

    return <>
        <h1>Hello</h1>
        <ul>
             {posts.map((post) => (
                 <li key={post._id}>
                    {editPost === post._id ? (
                        <EditPost post={post} onUpdate={updateMessage} onCancel={() => setEditPost(null)} />
                    ) : (<>
                            <h3>{post.title}</h3>
                            <p>{post.message}</p>
                            <p>De {post.author?.username || "Auteur inconnu"}</p>

                            {/* VERIFIER SI L UTILISATEUR EST BIEN LE CREATEUR DU MESSAGE */}
                            {post.author && post.author._id && localStorage.getItem('userId') === post.author._id && (
                                <>
                                    <button onClick={() => editMessage(post._id)}>Modifier</button>
                                    <button onClick={() => deleteMessage(post._id)}>Supprimer</button>
                                </>
                            )}
                        </>
                    )}

                 </li>
             ))}
        </ul>
        <SendMessage messageSend={newMessage} />
    </>
}

export default Posts;