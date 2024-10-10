const API_URL = "http://localhost:5000/post";

// afficher les messages
export const getPosts = async () => {
    const response = await fetch(API_URL);

    if(!response.ok) {
        throw new Error('erreur lors de la récupération des messages');
    }

    return response.json();
};

// créer un message
export const createPost = async (postData, token) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    });
    
    if(!response.ok) {
        console.log('reponse :', response);        
        throw new Error('erreur dans la création du message');
    }

    return await response.json();
}

// modifier un message
export const editPost = async (postId, postData, token) => {
    const response = await fetch(`${API_URL}/${postId}`, {
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    });

    if(!response.ok) {
        const error = await response.json();
        console.log('front error:', error);
        throw new Error('erreur dans l édition du message');
    }

    return await response.json();
}

// supprimer un message
export const deletePost = async (postId, token) => {
    const response = await fetch(`${API_URL}/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if(!response.ok) {
        throw new Error('erreur dans la suppression du message');
    }

    return response.json();
};

// à faire
export const likePost = async (postId) => {
    console.log('like');
    
};

export const dislikePost = async (postId) => {
    console.log('dislike');    
};