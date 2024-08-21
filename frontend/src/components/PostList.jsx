import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/postService';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPosts();
            setPosts(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <h3>{post.message}</h3>
                    <p>Auteur: {post.author}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;