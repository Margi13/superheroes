import { useState, useEffect } from 'react';
import * as superheroService from '../services/superheroService';
import * as likeService from '../services/likeService';
import * as adminService from '../services/adminService';
import * as firebaseService from '../services/firebaseService';

export const useOneHeroState = (id) => {
    const [superhero, setSuperhero] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (id) {
            superheroService.getOne(id)
                .then(res => {
                    likeService.getHeroLikes(id)
                        .then((likes) => {
                            res.likes = likes;
                            setSuperhero(res);
                        })
                        .catch(() => {
                            setSuperhero(res);
                        })
                })
                .catch(() => {
                    setSuperhero({});
                });
        } else {
            setSuperhero({});
        }
    }, [id, setSuperhero]);

    return [superhero, setSuperhero, imageUrl, setImageUrl]
}
export const useOneHeroWithPicState = (id) => {
    const [superhero, setSuperhero] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (id) {
            superheroService.getOne(id)
                .then(res => {
                    firebaseService.getImageFromFirebase(res.imageUrl, 'heroes')
                        .then(image => {
                            setImageUrl(image);
                        })
                        .catch(() => {
                            setImageUrl('')
                        });
                    likeService.getHeroLikes(id)
                        .then((likes) => {
                            res.likes = likes;
                            setSuperhero(res);
                        })
                        .catch(() => {
                            setSuperhero(res);
                        })
                })
                .catch(() => {
                    setSuperhero({});
                });
        } else {
            setSuperhero({});
        }
    }, [id, setSuperhero]);

    return [superhero, setSuperhero, imageUrl, setImageUrl]
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
                const result = res.sort((a, b) => a.status - b.status);
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

export const useTopHeroesState = () => {
    const [superheroes, setSuperhero] = useState([]);

    useEffect(() => {
        superheroService.getTopThree()
            .then(res => {
                setSuperhero(res);
            });
    }, [setSuperhero]);

    return [superheroes, setSuperhero]
}