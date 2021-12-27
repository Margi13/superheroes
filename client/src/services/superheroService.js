import * as request from './requester'
const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request.get(`${baseUrl}/superheroes`)

export const getOne = (heroId) => {
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

export const getLatest = () => {
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

export const getOwn = (ownerId) => {
    const query = encodeURIComponent(`_ownerId="${ownerId}"`);
    return request.get(`${baseUrl}/superheroes?where=${query}`);
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

export const update = (heroId, heroData) => request.put(`${baseUrl}/superheroes/${heroId}`, heroData);

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