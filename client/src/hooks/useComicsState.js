import { useState, useEffect } from 'react';
import * as comicsService from '../services/comicsService';
import * as adminService from '../services/adminService';

export const useOneComicsState = (id) => {
    const [comics, setComics] = useState({});

    useEffect(() => {
        comicsService.getOne(id)
            .then(res => {
                setComics(res);
            });
    }, [id, setComics]);

    return [comics, setComics];
}

export const useAllComicsState = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        comicsService.getAll()
            .then(res => {
                setComics(res);
            });
    }, [setComics]);

    return [comics, setComics];
}

export const useMyComicsState = (ownerId) => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        comicsService.getOwn(ownerId)
            .then(res => {
                const result = res.sort((a,b) => a.status - b.status);
                setComics(result);
            });
    }, [ownerId, setComics]);

    return [comics, setComics];
}
export const usePendingComicsState = (ownerId) => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        adminService.getAllPendingComics(ownerId)
            .then(res => {
                setComics(res);
            });
    }, [ownerId, setComics]);

    return [comics, setComics];
}