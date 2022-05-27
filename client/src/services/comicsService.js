import * as request from './requester';
import { comicsUrl } from '../common/urlConstants';

export const getAll = () => request.get(`${comicsUrl}`);

export const getOne = (comicsId) => request.get(`${comicsUrl}/${comicsId}`);

export const getOwn = (ownerId) => {
    const query = encodeURIComponent(`_ownerId="${ownerId}"`);
    return request.get(`${comicsUrl}?where=${query}`);
}

export const create = (comicsData) => request.post(`${comicsUrl}`, { ...comicsData }, true);

export const update = (comicsId, comicsData) => request.put(`${comicsUrl}/${comicsId}`, comicsData, true);

export const remove = (comicsId) => request.remove(`${comicsUrl}/${comicsId}`, null, true);
