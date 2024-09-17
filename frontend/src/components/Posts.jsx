import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/postService";
import '../styles/posts.css';
import SendMessage from "./SendMessage";
import EditPost from "./EditPost";
import Logout from "./Logout";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();            
                setPosts(data);
            } catch(err) {
                console.log(err.message);
            }
        };

        fetchPosts();
    }, []);

    const newMessage = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const editMessage = (postId) => {
        setEditPost(postId);
    };

    const deleteMessage = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            await deletePost(postId, token);
            setPosts(posts.filter((post) => post._id !== postId));

        } catch (err) {
            console.log(err);            
        }
    };

    const updateMessage = (updatePost) => {
        setPosts(posts.map((post) => (post._id === updatePost._id ? updatePost : post)));
        setEditPost(null);
    };

    return <>
        <h1>Hello</h1>
        <Logout />
        <div className="card-message">
            <ul>
                 {posts.map((post) => (
                     <li key={post._id}>
                        {editPost === post._id ? (
                            <EditPost post={post} update={updateMessage} cancel={() => setEditPost(null)} />
                        ) : (<>
                                <h3>{post.title}</h3>
                                <p>{post.message}</p>
                                <small>par : {post.author?.username || "Auteur inconnu"}</small>

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
        </div>
        <SendMessage messageSend={newMessage} />
    </>
}

export default Posts;