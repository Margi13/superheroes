import * as request from "./requester";
import { adminUrl } from "../common/urlConstants";

export const getAdminId = () => request.get(`${adminUrl}`);
export const getAllPendingHeroes = () => request.get(`${adminUrl}/pending/heroes`);
export const getAllPendingComics = () => request.get(`${adminUrl}/pending/comics`);

export const getOnePending = (heroId, type) => request.get(`${adminUrl}/pending/${type}/${heroId}`);

export const approve = (heroId, type) => request.put(`${adminUrl}/approve/${type}/${heroId}`, undefined, true);
export const decline = (heroId, data, type) => request.put(`${adminUrl}/decline/${type}/${heroId}`, data, true);