import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as comicsService from '../../services/comicsService';


import { alertMessages, titles } from '../../common/messagesConstantsBG';
import ComicsCard from './ComicsCard';
import './MyComics.css'
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

            {comics.length > 0
                ? comics.map(x => <ComicsCard key={x._id} comics={x} />)
                : noComicsElement
            }
        </section>
    );
}

export default MyComics;