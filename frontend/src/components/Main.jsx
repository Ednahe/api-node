import React, { useEffect, useState } from "react";
import { getPosts } from "../services/postService";

const Main = () => {
    const [posts, setPosts] = useState([]);

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
    return <>
        <h1>Hello</h1>
        <ul>
             {posts.map((post) => (
                 <li key={post._id}>
                     <h3>{post.title}</h3>
                     <p>{post.message}</p>
                     <p>Auteur: {post.author?.username}</p>
                 </li>
             ))}
        </ul>
    </>
}

export default Main;