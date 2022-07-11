import { useState, useEffect } from 'react';
import * as superheroService from '../services/superheroService';
import * as adminService from '../services/adminService';

export const useOneHeroState = (id) => {
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

export const useAllHeroesState = () => {
    const [superheroes, setSuperhero] = useState([]);

    useEffect(() => {
        superheroService.getAll()
            .then(res => {
                setSuperhero(res);
            });
    }, [setSuperhero]);

    return [superheroes, setSuperhero]
}

export const useMyHeroesState = (ownerId) => {
    const [superheroes, setSuperhero] = useState([]);

    useEffect(() => {
        superheroService.getOwn(ownerId)
            .then(res => {
                const result = res.sort((a,b) => a.status - b.status);
                setSuperhero(result);
            });
    }, [ownerId, setSuperhero]);

    return [superheroes, setSuperhero]
}

export const usePendingHeroesState = () => {
    const [superheroes, setSuperhero] = useState([]);

    useEffect(() => {
        adminService.getAllPendingHeroes()
            .then(res => {
                setSuperhero(res);
            });
    }, [setSuperhero]);

    return [superheroes, setSuperhero]
}
