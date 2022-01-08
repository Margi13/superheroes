import { getHeroLikes } from './likeService';
import * as request from './requester';
const baseUrl = 'http://localhost:5000/data/superheroes';

export const getAll = () => request.get(`${baseUrl}`)

export const getOne = (heroId) => request.get(`${baseUrl}/${heroId}`);

export const getTopThree = async () => {
    try {
        const result = [];
        const data = await getAll();

        if (data) {

            for (const hero of data) {
                const likes = await getHeroLikes(hero._id);
                result.push({ ...hero, likes: likes.length });
            }

            result.sort((a, b) => b.likes - a.likes);
            return result.slice(0, 3);
        } else {
            return [];
        }
    }
    catch (error) {
        throw new Error(error);
    }

}

export const getOwn = (ownerId) => {
    const query = encodeURIComponent(`_ownerId="${ownerId}"`);
    return request.get(`${baseUrl}?where=${query}`);
}

export const create = (heroData) => request.post(`${baseUrl}`, { ...heroData }, true);

export const update = (heroId, heroData) => request.put(`${baseUrl}/${heroId}`, heroData, true);

export const remove = (heroId) => request.remove(`${baseUrl}/${heroId}`, null, true);
