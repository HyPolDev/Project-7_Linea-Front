import axios from "axios";
import { useSelector } from "react-redux";
import { userData, logout } from "../app/slices/userSlice";
const root = "http://localhost:4000";

export const loginCall = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}/login`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        //SI NECESITASE TOKEN
        if (data.message === "Token Error") {
            dispatch(logout({ credentials: "" }))
        }


        return data;
    } catch (error) {
        return error;
    }
};

export const registerCall = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}/register`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        //SI NECESITASE TOKEN
        if (data.message === "Token Error") {
            dispatch(logout({ credentials: "" }))
        }


        return data;
    } catch (error) {
        return error;
    }
};

export const getUserCall = async (token, name) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(root + "/users/" + name, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const getUsersCall = async (token, name) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(root + "/users/", options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};


export const getUserPostsCall = async (token, name) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: name })
    };

    try {
        const response = await fetch(root + "/posts/user", options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        data.data.reverse()
        return data;
    } catch (error) {
        return error;
    }
};

export const getPostsCall = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };

    try {
        const response = await fetch(root + "/posts/", options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        data.posts.reverse()
        return data
    } catch (error) {
        return error;
    }
};

export const postPostCall = async (token, text) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: text })
    };

    try {
        const response = await fetch(root + "/posts/", options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const editProfileCall = async (token, body, userName) => {

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    };

    try {
        const response = await fetch(root + "/users/" + userName, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const likePostCall = async (token, postId) => {

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };

    try {
        const response = await fetch(root + "/posts/like/" + postId, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const editpostCall = async (token, body) => {

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    };

    try {
        console.log("0");
        const response = await fetch(root + "/posts/", options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};