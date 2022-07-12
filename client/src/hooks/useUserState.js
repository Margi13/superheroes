import { useState, useEffect } from 'react';
import * as profileService from '../services/profileService';

export const useUserState = (id) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        profileService.getById(id)
            .then(res => {
                console.log(res)
                setUser(res);
            });
    }, [id, setUser]);

    return [user, setUser];
}