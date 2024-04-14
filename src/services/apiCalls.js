import axios from "axios";
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

export const getUserCall = async (token, userName) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
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

export const getUserPostsCall = async (token, userName) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: userName })
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
    console.log("function called");
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