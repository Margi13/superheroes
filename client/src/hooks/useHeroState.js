import { useState, useEffect } from 'react';
import * as superheroService from '../services/superheroService';

const useHeroState = (id) => {
    const [superhero, setSuperhero] = useState({});

    useEffect(() => {
        superheroService.getOne(id)
            .then(res => {
                setSuperhero(res);
            });
    }, [id, setSuperhero]);

    return [superhero, setSuperhero]
}

export default useHeroState;