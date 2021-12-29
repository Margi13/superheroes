import { useState, useEffect } from 'react';
import * as superheroService from '../services/superheroService';

const useHeroState = (heroId) => {
    const [superhero, setSuperhero] = useState({});

    useEffect(() => {
        superheroService.getOne(heroId)
            .then(res => {
                setSuperhero(res);

            })
            .catch(error=>{
                throw new Error(error);
            });

    }, [heroId]);

    return [
        superhero,
        setSuperhero
    ]
}

export default useHeroState;