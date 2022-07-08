import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import * as comicsService from '../../../services/comicsService';


import { alertMessages, titles } from '../../../common/messagesConstantsBG';
import MyCard from '../../Card/MyCard';
import '../MyHeroes/MyHeroes.css';
const MyComics = () => {
    const [comics, setComics] = useState([]);
    const { user } = useAuthContext();
    useEffect(() => {
        comicsService.getOwn(user._id)
            .then(data => {
                setComics(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [user._id]);
    const noComicsElement = (
        <div>
            <p className="no-articles">{alertMessages.NoComics}</p>
        </div>
    );

    return (
        <section className="my-comics-page my-heroes-page">
            <h1>{titles.MyComics}</h1>
            <div className="hero-container">

                {comics.length > 0
                    ? comics.map(x =>
                        <MyCard
                            id={x._id}
                            title={x.title.split(' ').join('_')}
                            status={x.status}
                            type="comics"
                            image={x.coverPage}
                            key={x._id}
                        >
                            <h2>{x.title}</h2>
                            <p className="description">{x.description.slice(0, 100) + '...'}</p>
                        </MyCard>)
                    : noComicsElement
                }
            </div>
        </section>
    );
}

export default MyComics;