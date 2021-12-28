import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const like = (userId, heroId) => request.post(`${baseUrl}/likes`, { userId, heroId }, true);
export const getHeroLikes = (heroId) => {
    const query = encodeURIComponent(`heroId="${heroId}"`);
    
    return request.get(`${baseUrl}/likes?select=userId&where=${query}`, null, false)
    .then(res=>res.map(x=> x.userId));
}