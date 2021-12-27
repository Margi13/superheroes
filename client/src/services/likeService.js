import * as request from './requester';
import * as superheroService from './superheroService';

const baseUrl = 'http://localhost:3030/data';

export const like = (userId, heroId) => request.post(`${baseUrl}/likes`, { userId, heroId });
export const getHeroLikes = (heroId) => {
    const query = encodeURIComponent(`heroId="${heroId}"`);
    
    return request.get(`${baseUrl}/likes?select=userId&where=${query}`)
    .then(res=>res.map(x=> x.userId));
}