import * as request from './requester';
import { reportsUrl } from '../common/urlConstants';

export const report = (reportMessage, dataId, ownerId) => request.post(`${reportsUrl}`, { ownerId, dataId, reportMessage }, true);

export const getAllReports = () => request.get(`${reportsUrl}`, null, true);

export const ignoreReport = (id) => request.put(`${reportsUrl}/${id}`, null, true);