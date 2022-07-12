import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';

import { titles } from '../../../common/messagesConstantsBG';
import MyCard from '../../Card/MyCard';
import PrevAndNext from '../../ReadComics/Parts/PrevAndNext';
import FirstAndLast from '../../ReadComics/Parts/FirstAndLast';
import './MyHeroes.css'
import '../../Catalog/Catalog.css';
import { useMyHeroesState } from '../../../hooks/useHeroState';
const MyHeroes = ({
    pageSize
}) => {
    const { user } = useAuthContext();
    const [superheroes] = useMyHeroesState(user._id);
    const [pagedHeroes, setPagedHeroes] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    useEffect(() => {
        const paged = superheroes.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        setPagedHeroes(paged);
    }, [superheroes, pageIndex, pageSize]);

    return (
        <section className="my-heroes-page">
            <h1>{titles.MyHeroes}</h1>
            <div className="hero-container">
                {pagedHeroes.length > 0
                    ? pagedHeroes.map(x =>
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
                    : ''
                }
            </div>
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
                    <h3>{titles.Page} {pageIndex + 1}/{Math.ceil(superheroes.length / pageSize) || 1}</h3>
                </PrevAndNext>
            </FirstAndLast>
        </section>
    );
}

export default MyHeroes;