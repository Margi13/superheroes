import { useState, useEffect } from 'react';
import * as comicsService from '../services/comicsService';

const useHeroState = (id) => {
    const [comics, setComics] = useState({});

    useEffect(() => {
        comicsService.getOne(id)
            .then(res => {
                setComics(res);
            });
    }, [id, setComics]);

    return [comics, setComics]
}

export default useHeroState;