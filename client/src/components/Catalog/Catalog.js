import { useEffect, useState } from 'react';
import * as superheroService from '../../services/superheroService';

import {titles,alertMessages} from '../../common/messagesConstantsBG'
import HeroCard from './HeroCard';
import './Catalog.css';
const Catalog = () => {
    const [superheroes, setSuperheroes] = useState([]);

    useEffect(() => {
        superheroService.getAll()
            .then(data => {
                setSuperheroes(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const noHeroesElement = (
        <div>
            <p className="no-articles">{alertMessages.NoSuperheroes}</p>
        </div>
    );
    
    return (
        <section className="catalog-page">
            <h1>{titles.AllSuperheroes}</h1>

            {superheroes.length > 0
                ? superheroes.map(x => <HeroCard key={x._id} hero={x} />)
                : noHeroesElement
            }


        </section>
    );
}

export default Catalog;