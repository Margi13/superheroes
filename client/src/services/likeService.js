import * as request from './requester';
import { likesUrl } from '../common/urlConstants';

export const like = (heroId, ownerId) => request.post(`${likesUrl}`, { heroId, ownerId }, true);
export const getHeroLikes = (heroId) => {
    const query = encodeURIComponent(`heroId="${heroId}"`);

    return request.get(`${likesUrl}?select=_ownerId&where=${query}`, null, false)
        .then(res => res.map(x => x._ownerId));
}