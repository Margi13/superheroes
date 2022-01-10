import * as request from "./requester";
const baseUrl = 'http://localhost:5000/admin';

export const getAdminId = () => request.get(`${baseUrl}`);
export const getAllPending = () => request.get(`${baseUrl}/pending`);

export const getOnePending = (heroId) => request.get(`${baseUrl}/pending/${heroId}`);

export const approve = (heroId, heroData) => request.put(`${baseUrl}/approve/${heroId}`, heroData, true);
export const decline = (heroId, heroData) => request.put(`${baseUrl}/decline/${heroId}`, heroData, true);