import { useEffect, useState } from 'react';
import * as superheroService from '../../../services/superheroService';

import { titles, alertMessages } from '../../../common/messagesConstantsBG'
import HeroCard from '../../Card/HeroCard';
import PrevAndNext from '../../ReadComics/Parts/PrevAndNext';
import FirstAndLast from '../../ReadComics/Parts/FirstAndLast';
import '../Catalog.css';
const HeroesCatalog = ({
    pageSize
}) => {
    const [superheroes, setSuperheroes] = useState([]);
    const [pagedHeroes, setPagedHeroes] = useState([]);
    let [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        superheroService.getAll()
            .then(data => {
                setSuperheroes(data);
            })
            .catch(error => {
                console.log(error);
            });
        const paged = superheroes.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        setPagedHeroes(paged);
    }, [superheroes, pageIndex, pageSize]);
    const noHeroesElement = (
        <div>
            <p className="no-articles">{alertMessages.NoSuperheroes}</p>
        </div>
    );

    return (
        <>
            <h1>{titles.AllSuperheroes}</h1>
            <section>
                <div className="card-rows">
                    {pagedHeroes.length > 0
                        ? pagedHeroes.map(x => <HeroCard key={x._id} hero={x} />)
                        : noHeroesElement
                    }
                </div>
            </section>
            <FirstAndLast className="catalog-fl"
                totalPages={Math.ceil(superheroes.length / pageSize)}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
            >
                <PrevAndNext className="catalog-pn"
                    totalItems={superheroes.length}
                    setPageIndex={setPageIndex}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                >
                    <h3>{titles.Page} {pageIndex + 1}/{Math.ceil(superheroes.length / pageSize)}</h3>
                </PrevAndNext>
            </FirstAndLast>
        </>
    );
}

export default HeroesCatalog;