const API_URL = "http://localhost:5000";

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