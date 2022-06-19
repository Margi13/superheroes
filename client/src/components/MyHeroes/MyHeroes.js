import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as superheroService from '../../services/superheroService';


import { alertMessages, titles } from '../../common/messagesConstantsBG';
import MyCard from '../Card/MyCard';
import './MyHeroes.css'
const MyHeroes = () => {
    const [superheroes, setSuperheroes] = useState([]);
    const { user } = useAuthContext();
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
        <section className="my-heroes-page">
            <h1>{titles.MyHeroes}</h1>
            <div className="hero-container">
                {superheroes.length > 0
                    ? superheroes.map(x =>
                        <MyCard
                            id={x._id}
                            status={x.status}
                            type="heroes"
                            image={x.imageUrl}
                            key={x._id}
                        >
                            <h2>{x.heroName}</h2>
                            <p className="description">{x.story.slice(0, 70) + '...'}</p>
                        </MyCard>
                    )
                    : noHeroesElement
                }
            </div>

        </section>
    );
}

export default MyHeroes;