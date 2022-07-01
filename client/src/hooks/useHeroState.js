import { useState, useEffect } from 'react';
import * as superheroService from '../services/superheroService';

const useHeroState = (id) => {
    const [superhero, setSuperhero] = useState({});

    useEffect(() => {
        if (id) {
            superheroService.getOne(id)
            .then(res => {
                setSuperhero(res);
            });
        } else {
            setSuperhero({});
        }
    }, [id, setSuperhero]);

    return [superhero, setSuperhero]
}

export default useHeroState;