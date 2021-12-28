import * as request from "./requester";

const baseUrl = 'http://localhost:3030';
export const login = async(email, password) => request.post(`${baseUrl}/users/login`, {email, password}, false);

export const logout = () => request.get(`${baseUrl}/users/logout`, null, true);

export const isAuthenticated = () => {

}

export const getUser = () => {

}

export const register = async(email, password) => request.post(`${baseUrl}/users/register`, {email, password}, false)