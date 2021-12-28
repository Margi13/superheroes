import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const like = (heroId) => request.post(`${baseUrl}/likes`, { heroId }, true);
export const getHeroLikes = (heroId) => {
    const query = encodeURIComponent(`heroId="${heroId}"`);
    
    return request.get(`${baseUrl}/likes?select=_ownerId&where=${query}`, null, false)
    .then(res=>res.map(x=> x._ownerId));
}