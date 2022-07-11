import { useEffect, useState } from 'react';

import { titles } from '../../../common/messagesConstantsBG'
import ComicsCard from '../../Card/ComicsCard';
import PrevAndNext from '../../ReadComics/Parts/PrevAndNext';
import FirstAndLast from '../../ReadComics/Parts/FirstAndLast';
import '../Catalog.css';
import { useAllComicsState } from '../../../hooks/useComicsState';
const ComicsCatalog = ({
    pageSize
}) => {
    const [comics] = useAllComicsState();
    const [pagedComics, setPagedComics] = useState([]);
    let [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        const paged = (comics||[]).slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        setPagedComics(paged);
    }, [comics, pageIndex, pageSize]);

    return (
        <>
            <h1>{titles.AllComics}</h1>
            <section>
                <div className="card-rows">
                    {pagedComics.length > 0
                        ? pagedComics.map(x => <ComicsCard key={x._id} comics={x} />)
                        : ''
                    }
                </div>
            </section>
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

export default ComicsCatalog;