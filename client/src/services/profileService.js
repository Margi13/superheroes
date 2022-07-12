import * as request from "./requester";
import { usersUrl } from "../common/urlConstants";

export const getById = (id) => request.get(`${usersUrl}/${id}`);