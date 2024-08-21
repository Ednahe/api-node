const API_URL = "http://localhost:5000/post";

export const getPosts = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const createPost = async (postData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type" : "application:json"
        },
        body: JSON.stringify(postData),
    });
    return await response.json();
}

export const editPost = async (id, postData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type" : "application:json"
        },
        body: JSON.stringify(postData),
    });
    return await response.json();
}

export const deletePost = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

export const likePost = async (id, userId) => {
    const response = await fetch(`${API_URL}/like-post/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    })
    return await response.json();
};

export const dislikePost = async (id, userId) => {
    const response = await fetch('${API_URL}/dislike-post/${id}', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });
    return await response.json();
};