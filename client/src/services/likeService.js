import * as request from './requester';

const baseUrl = 'http://localhost:5000/data/likes';

export const like = (heroId, ownerId) => request.post(`${baseUrl}`, { heroId, ownerId }, true);
export const getHeroLikes = (heroId) => {
    const query = encodeURIComponent(`heroId="${heroId}"`);

    return request.get(`${baseUrl}?select=_ownerId&where=${query}`, null, false)
        .then(res => res.map(x => x._ownerId));
}