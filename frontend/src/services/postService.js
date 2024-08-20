const API_URL = "http://localhost:5000/post";

export const getPosts = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};