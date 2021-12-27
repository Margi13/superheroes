import { useEffect, useState } from 'react';
import {useAuthContext} from '../../contexts/AuthContext';
import * as superheroService from '../../services/superheroService';


import { alertMessages,titles } from '../../common/messagesConstantsBG';
import HeroCard from './HeroCard';
import './MyHeroes.css'
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
            <p className="no-articles">{alertMessages.NoSuperheroes}</p>
        </div>
    );
    
    return (
        <section className="my-pets-page">
            <h1>{titles.MyHeroes}</h1>

            {superheroes.length > 0
                ? superheroes.map(x => <HeroCard key={x._id} hero={x} />)
                : noHeroesElement
            }


        </section>
    );
}

export default MyHeroes;