import { useState, useEffect } from 'react';
import * as comicsService from '../services/comicsService';
import * as adminService from '../services/adminService';
import * as firebaseService from '../services/firebaseService';

export const useOneComicsState = (id, populate) => {
    const [comics, setComics] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        comicsService.getOne(id, populate)
            .then(res => {
                setComics(res);
            });
    }, [id, setComics, populate]);

    return [comics, setComics, imageUrl, setImageUrl]
}
export const useOneComicsWithPicState = (id) => {
    const [comics, setComics] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        comicsService.getOne(id, false)
            .then(res => {
                const imagePath = `comics/${res._id}`;
                firebaseService.getImageFromFirebase(res.coverPage, imagePath)
                    .then(image => {
                        setImageUrl(image);
                    })
                    .catch(() => {
                        setImageUrl('')
                    });
                setComics(res);
            });
    }, [id, setComics]);

    return [comics, setComics, imageUrl, setImageUrl]
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
                const result = res.sort((a, b) => a.status - b.status);
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