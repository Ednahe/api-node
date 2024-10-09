const API_URL = "https://api-node-ou4w.onrender.com";

// inscription
export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/inscription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if(!response.ok) {
        throw new Error('erreur lors de la création du compte');
    }

    return response.json();
}

// connexion
export const login = async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if(!response.ok) {
        throw new Error('erreur lors de la connexion');
    }

    return response.json();
}

// deconnexion
export const logout = async (userId) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/logout/${userId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,  
        },
    });

    if(!response.ok) {
        throw new Error('erreur lors de la déconnexion');
    }

    return response.json();
}

// trouver tous les utilisateurs
export const getUser = async (userId) => {
    const response = await fetch(`${API_URL}/${userId}`);

    if (!response.ok) {
        throw new Error('erreur lors de la récupération des utilisateurs');
    }

    return response.json();
};

// modifier l'utilisateur
export const updateUser = async (userId, userData) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('erreur lors de l update');
    }

    return response.json();
};

// supprimer l'utilisateur
export const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('erreur lors de la suppression du compte');
    }

    return response.json();
};