import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/postService";
import '../styles/posts.css';
import SendMessage from "./SendMessage";
import EditPost from "./EditPost";
import Logout from "./Logout";
import EditUser from "./EditUser";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);
    const [edititingUser, setEditingUser] = useState(false);

    const userId = localStorage.getItem('userId');

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
        <div className="contain-top-btn">
            <Logout />
            <button onClick={() => setEditingUser(!edititingUser)}>
                {edititingUser ? "Retour" : "Editer profil"}
            </button>
        </div>
        {edititingUser ? (
                <EditUser userId={userId}/>
            ) : (
                <div className="contain-card-message">
                <h3 className="title-post">Bienvenue sur e c h o, l'application ou tu peux partager ton son jusqu'à 20 Mo maximum.</h3>
                <div className="card-message">
                    <ul>
                        {posts.map((post) => (
                            <li key={post._id} className="li-message">
                                {editPost === post._id ? (
                                    <EditPost post={post} update={updateMessage} cancel={() => setEditPost(null)} />
                                ) : (
                                    <>
                                        <h4 className="message">{post.message}</h4>
                                        {/* traiter soucis mobile  */}
                                        {post.audioUrl && (
                                            <audio controls>
                                                <source src={post.audioUrl} type="audio/mp3" />
                                            </audio>
                                        )}
                                        <small>par : {post.author?.username}</small>

                                        {/* Vérifier si l'utilisateur est bien le créateur du message */}
                                        {post.author && post.author._id && localStorage.getItem('userId') === post.author._id && (
                                            <div className="contain-btn-edit">
                                                <button onClick={() => editMessage(post._id)}>Modifier</button>
                                                <button onClick={() => deleteMessage(post._id)}>Supprimer</button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <SendMessage messageSend={newMessage} />
                </div>
            )}
    </>
}

export default Posts;