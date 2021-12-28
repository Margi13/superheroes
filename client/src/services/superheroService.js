import { getHeroLikes } from './likeService';
import * as request from './requester';
const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request.get(`${baseUrl}/superheroes`)

export const getOne = (heroId) => request.get(`${baseUrl}/superheroes/${heroId}`);

export const getTopThree = async() => {
    try{
        const result = [];
        const data = await getAll();
        
        for (const hero of data) {
            const likes = await getHeroLikes(hero._id);
            result.push({...hero, likes: likes.length});
        }
        
        result.sort((a,b)=> b.likes - a.likes);
        return result.slice(0,3);
    }
    catch(error){
        throw new Error(error);
    }

}

export const getOwn = (ownerId) => {
    const query = encodeURIComponent(`_ownerId="${ownerId}"`);
    return request.get(`${baseUrl}/superheroes?where=${query}`);
}

export const create = (heroData) => request.post(`${baseUrl}/superheroes`, { ...heroData }, true);

export const update = (heroId, heroData) => request.put(`${baseUrl}/superheroes/${heroId}`, heroData, true);

export const remove = (heroId) => request.remove(`${baseUrl}/superheroes/${heroId}`, null, true);
