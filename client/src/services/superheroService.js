import * as request from './requester';
const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request.get(`${baseUrl}/superheroes`)

export const getOne = (heroId) => request.get(`${baseUrl}/superheroes/${heroId}`);

export const getLatest = () => {
    // request.get(`${baseUrl}/superheroes/${heroId}`);
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

export const create = async (heroData) => request.post(`${baseUrl}/superheroes`, { ...heroData, likes: [] }, true);

export const update = (heroId, heroData) => request.put(`${baseUrl}/superheroes/${heroId}`, heroData, true);

export const remove = (heroId, token) => request.remove(`${baseUrl}/superheroes/${heroId}`, null, true);
