import * as request from './requester';
import { reportsUrl } from '../common/urlConstants';

export const report = (reportMessage, ownerId) => request.post(`${reportsUrl}`, { ownerId, reportMessage }, true);

export const getHeroReports = (heroId) => {
    const query = encodeURIComponent(`heroId="${heroId}"`);

    return request.get(`${reportsUrl}?select=_ownerId&where=${query}`, null, false)
        .then(res => res.map(x => x._ownerId));
}

export const getComicsReports = (comicsId) => {
    const query = encodeURIComponent(`comicsId="${comicsId}"`);

    return request.get(`${reportsUrl}?select=_ownerId&where=${query}`, null, false)
        .then(res => res.map(x => x._ownerId));
}