import { useEffect, useState } from 'react';
import * as comicsService from '../../../services/comicsService';

import { titles, alertMessages } from '../../../common/messagesConstantsBG'
import ComicsCard from '../../Card/ComicsCard';
import '../Catalog.css';
const ComicsCatalog = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        comicsService.getAll()
            .then(data => {
                setComics(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const noComicsElement = (
        <div>
            <p className="no-articles">{alertMessages.NoComics}</p>
        </div>
    );

    return (
        <>
            <h1>{titles.AllComics}</h1>
            <section>
                <div className="card-rows">
                    {comics.length > 0
                        ? comics.map(x => <ComicsCard key={x._id} comics={x} />)
                        : noComicsElement
                    }
                </div>
            </section>
            <h3 align="center" float="none">Страница 1/1</h3>
        </>
    );
}

export default ComicsCatalog;