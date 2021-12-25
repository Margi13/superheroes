import { useEffect, useState, Link } from 'react';
import * as superheroService from '../../services/superheroService';

import './Catalog.css'
import HeroCard from './HeroCard';
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
            <p className="no-articles">No superheroes yet...</p>
        </div>
    );
    
    return (
        <section className="catalog-page">
            <h1>All Superheroes</h1>

            {superheroes.length > 0
                ? superheroes.map(x => <HeroCard key={x._id} hero={x} />)
                : noHeroesElement
            }


        </section>
    );
}

export default Catalog;