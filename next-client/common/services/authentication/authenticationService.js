import axios from "axios";

export const login = async (
    username,
    password
) => {
    await axios
        .request({
            url: `/auth/jwt/create/`,
            method: "post",
            baseURL: "http://127.0.0.1:8000/",
            data: {
                username: username,
                password: password
            }
        })
        .then((response) => {
            if (typeof window !== "undefined") {
                localStorage.setItem('token', response.data.access)
            }
        })
        .catch((error) => {
            console.log(error.response.data.error);
        });
};


export const register = async (
    username,
    password,
    first_name,
    last_name,
    email
) => {
    return await axios
        .request({
            url: `/auth/users/`,
            method: "post",
            baseURL: "http://127.0.0.1:8000/",
            data: {
                username: username,
                password: password,
                re_password: password,
                last_name: last_name,
                first_name: first_name,
                email: email
            }
        })


};