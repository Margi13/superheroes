import { useEffect, useState } from 'react';
import {useAuthContext} from '../../contexts/AuthContext';
import * as superheroService from '../../services/superheroService';

import './MyHeroes.css'
import HeroCard from './HeroCard';
const MyHeroes = () => {
    const [superheroes, setSuperheroes] = useState([]);
    const {user} = useAuthContext();
    useEffect(() => {
        superheroService.getOwn(user._id)
            .then(data => {
                setSuperheroes(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [user._id]);
    const noHeroesElement = (
        <div>
            <p className="no-articles">No superheroes yet...</p>
        </div>
    );
    
    return (
        <section className="my-pets-page">
            <h1>My Superheroes</h1>

            {superheroes.length > 0
                ? superheroes.map(x => <HeroCard key={x._id} hero={x} />)
                : noHeroesElement
            }


        </section>
    );
}

export default MyHeroes;