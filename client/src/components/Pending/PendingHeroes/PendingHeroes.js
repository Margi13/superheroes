import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { titles } from '../../../common/messagesConstantsBG';

import PrevAndNext from '../../ReadComics/Parts/PrevAndNext';
import FirstAndLast from '../../ReadComics/Parts/FirstAndLast';
import PendingCard from '../../Card/PendingCard';
import '../../Catalog/Catalog.css';
import { usePendingHeroesState } from '../../../hooks/useHeroState';

const PendingHeroes = ({
    pageSize
}) => {
    const navigate = useNavigate();
    const [superheroes] = usePendingHeroesState();
    const [pagedHeroes, setPagedHeroes] = useState([]);
    let [pageIndex, setPageIndex] = useState(0);
    useEffect(() => {
        const paged = superheroes.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        setPagedHeroes(paged);
    }, [navigate, superheroes, pageIndex, pageSize]);

    return (
        <>
            <h1>{titles.PendingHeroes}</h1>
            <div className="heroes-container">

                {pagedHeroes.length > 0
                    ? pagedHeroes.map(x =>
                        <PendingCard
                            key={x._id}
                            type="heroes"
                            data={x}
                        >
                            <h2>{x.personName} ({x.heroName})</h2>
                            <p className="description">
                                {x.story.slice(0, 200) + '...'}
                            </p>
                        </PendingCard>)
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
        </>
    );
}

export default PendingHeroes;