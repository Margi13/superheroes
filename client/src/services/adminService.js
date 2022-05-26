import * as request from "./requester";
import { adminUrl } from "../common/urlConstants";

export const getAdminId = () => request.get(`${adminUrl}`);
export const getAllPending = () => request.get(`${adminUrl}/pending`);

export const getOnePending = (heroId) => request.get(`${adminUrl}/pending/${heroId}`);

export const approve = (heroId, heroData) => request.put(`${adminUrl}/approve/${heroId}`, heroData, true);
export const decline = (heroId, heroData) => request.put(`${adminUrl}/decline/${heroId}`, heroData, true);