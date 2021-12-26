import { request } from './requester'
const baseUrl = 'http://localhost:3030/data';
//1:30 -> Create
//2:22 -> localStorage
export const getAll = () => request(`${baseUrl}/superheroes`)

export function getOne(heroId) {
    return fetch(`${baseUrl}/superheroes/${heroId}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('No response:', res.statusText)
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export function getLatest() {
    return fetch(`${baseUrl}/superheroes`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('No response:', res.statusText)
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const create = async (heroData, token) => {
    let response = await fetch(`${baseUrl}/superheroes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({ ...heroData, likes: [] })

    });
    let result = await response.json();
    return result;
}

export const remove = (heroId, token) => {
    return fetch(`${baseUrl}/superheroes/${heroId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    })
        .then(res => res.json)
}

export const like = (heroId, superhero, token) => {
    return fetch(`${baseUrl}/superheroes/${heroId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({
            superhero
        })
    })
    .then(res => res.json());
}