import * as request from "./requester";

const baseUrl = 'http://localhost:5000/users';
export const login = async(email, password) => request.post(`${baseUrl}/login`, {email, password}, false);

export const logout = () => request.get(`${baseUrl}/logout`, null, true);

export const register = async(email, password) => request.post(`${baseUrl}/register`, {email, password}, false)