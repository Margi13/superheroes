import * as request from "./requester";
import { usersUrl } from "../common/urlConstants";

export const login = async (email, password) => request.post(`${usersUrl}/login`, { email, password }, false);

export const logout = () => request.get(`${usersUrl}/logout`, null, true);

export const register = async (email, password) => request.post(`${usersUrl}/register`, { email, password }, false)