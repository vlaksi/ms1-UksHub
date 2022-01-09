import axios from "axios";

export const login = async (
    username,
    password
) => {
    return await axios
        .request({
            url: `/auth/jwt/create/`,
            method: "post",
            baseURL: "http://127.0.0.1:8000/",
            data: {
                username: username,
                password: password
            }
        })

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