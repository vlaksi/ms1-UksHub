import axios from 'axios';
import { getToken } from '../authentication/token';

export const getAllUsers = async () => {
    let users;
    await axios
        .request({
            url: `/useractivity/users/`,
            method: 'get',
            baseURL: 'http://127.0.0.1:8000/',
            headers: { Authorization: 'JWT ' + getToken() },
            data: {
                grant_type: 'client_credentials',
                scope: 'public',
            },
        })
        .then((response) => {
            users = response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return users;
};

export const getUserDataForSearch = async () => {
    const users = await getAllUsers();

    let dataForSearch = [];
    users.map((user) => {
        dataForSearch.push({
            title: user.username,
            pk: user.pk,
            type: 'user',
        });
    });

    return dataForSearch;
};

export const getUserById = async (authorId) => {
    let user;
    await axios
        .request({
            url: `/useractivity/users/${authorId}`,
            method: 'get',
            baseURL: 'http://127.0.0.1:8000/',
            headers: { Authorization: 'JWT ' + getToken() },
            data: {
                grant_type: 'client_credentials',
                scope: 'public',
            },
        })
        .then((response) => {
            user = response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return user;
};

export const getAllUsersForAdmin = async () => {
    let users;
    await axios
        .request({
            url: `/useractivity/manageusers/`,
            method: 'get',
            baseURL: 'http://127.0.0.1:8000/',
            headers: { Authorization: 'JWT ' + getToken() },
            data: {
                grant_type: 'client_credentials',
                scope: 'public',
            },
        })
        .then((response) => {
            users = response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return users;
};

export const addUser = async (newUserUsername, newUserPassword, newUserFirstName, newUserLastName, newUserEmail) => {
    let repository = null;
    await axios
        .request({
            url: `/useractivity/manageusers/`,
            method: 'post',
            baseURL: 'http://127.0.0.1:8000/',
            headers: { Authorization: 'JWT ' + getToken() },
            data: {
                username: newUserUsername,
                password: newUserPassword,
                first_name: newUserFirstName,
                last_name: newUserLastName,
                email: newUserEmail,
                grant_type: 'client_credentials',
                scope: 'public',
            },
        })
        .then((response) => {
            repository = response.data;
        })
        .catch((error) => {
            console.log(error.response.data.error);
        });

    return repository;
};

export const editUser = async (userId, newUserUsername, newUserPassword, newUserFirstName, newUserLastName, newUserEmail) => {
    let repository = null;
    await axios
        .request({
            url: `/useractivity/manageusers/${userId}`,
            method: 'put',
            baseURL: 'http://127.0.0.1:8000/',
            headers: { Authorization: 'JWT ' + getToken() },
            data: {
                username: newUserUsername,
                password: newUserPassword,
                first_name: newUserFirstName,
                last_name: newUserLastName,
                email: newUserEmail,
                grant_type: 'client_credentials',
                scope: 'public',
            },
        })
        .then((response) => {
            repository = response.data;
        })
        .catch((error) => {
            console.log(error.response.data.error);
        });

    return repository;
};

export const deleteUser = async (userId) => {
    let repository = null;
    await axios
        .request({
            url: `/useractivity/manageusers/${userId}`,
            method: 'delete',
            baseURL: 'http://127.0.0.1:8000/',
            headers: { Authorization: 'JWT ' + getToken() },
            data: {},
        })
        .then((response) => {
            repository = response.data;
        })
        .catch((error) => {
            console.log(error.response.data.error);
        });

    return repository;
};
