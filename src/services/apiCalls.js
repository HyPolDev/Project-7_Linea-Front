import axios from "axios";
const root = "http://localhost:4000/api/";

export const loginCall = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/login`, options);

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