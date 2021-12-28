import * as request from "./requester";

const baseUrl = 'http://localhost:3030';
export const login = async(email, password) => {
    let response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    //to extraxt this in other component to reuse in register
    let jsonResult = await response.json();
    if (response.ok) {
        return jsonResult;
    } else {
        //TODO: show notification
        throw jsonResult.message;
    }
}

export const logout = (token) => request.get(`${baseUrl}/users/logout`, null, true);

export const isAuthenticated = () => {

}

export const getUser = () => {

}

export const register = async(email, password) => {
    let response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    let jsonResult = await response.json();
    if (response.ok) {
        return jsonResult;
    } else {
        //TODO: show notification
        throw jsonResult.message;
    }
}