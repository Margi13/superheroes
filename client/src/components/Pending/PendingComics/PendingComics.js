import { useEffect, useState } from 'react';

import { titles } from '../../../common/messagesConstantsBG';

import PendingCard from '../../Card/PendingCard';
import PrevAndNext from '../../ReadComics/Parts/PrevAndNext';
import FirstAndLast from '../../ReadComics/Parts/FirstAndLast';
import '../../Catalog/Catalog.css';
import { usePendingComicsState } from '../../../hooks/useComicsState';

const PendingComics = ({
    pageSize
}) => {
    const [comics] = usePendingComicsState();
    const [pagedComics, setPagedComics] = useState([]);
    let [pageIndex, setPageIndex] = useState(0);
    useEffect(() => {
        const paged = comics.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        setPagedComics(paged);

    }, [comics, pageIndex, pageSize]);

    return (
        <>
            <h1>{titles.PendingComics}</h1>
            <div className="heroes-container">
                {pagedComics.length > 0
                    ? pagedComics.map(x =>
                        <PendingCard
                            key={x._id}
                            type="comics"
                            data={x}
                        >
                            <h2>{x.title}</h2>
                            <p className="description">
                                {x.description.slice(0, 200) + '...'}
                            </p>

                        </PendingCard>)
                    : ''
                }
            </div>
            <FirstAndLast className="catalog-fl"
                totalPages={Math.ceil(comics.length / pageSize)}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
            >
                <PrevAndNext className="catalog-pn"
                    totalItems={comics.length}
                    setPageIndex={setPageIndex}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                >
                    <h3>{titles.Page} {pageIndex + 1}/{Math.ceil(comics.length / pageSize) || 1}</h3>
                </PrevAndNext>
            </FirstAndLast>
        </>
    );
}

export default PendingComics;