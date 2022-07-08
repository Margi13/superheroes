import { getHeroLikes } from './likeService';
import * as request from './requester';
import { superheroesUrl } from '../common/urlConstants';

export const getAll = () => request.get(`${superheroesUrl}`);

export const getOne = (heroId) => request.get(`${superheroesUrl}/${heroId}`);

export const getTopThree = async () => {
    try {
        const result = [];
        const data = await getAll();
        if (!data.type) {
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
    return request.get(`${superheroesUrl}?where=${query}`);
}

export const create = (heroData) => request.post(`${superheroesUrl}`, { ...heroData }, true);

export const update = (heroId, heroData) => request.put(`${superheroesUrl}/${heroId}`, heroData, true);

export const remove = (heroId) => request.remove(`${superheroesUrl}/${heroId}`, null, true);

export const getByHeroicName = (heroName) => request.get(`${superheroesUrl}?heroName=${heroName}`);