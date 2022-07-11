import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';

import { titles } from '../../../common/messagesConstantsBG';
import MyCard from '../../Card/MyCard';
import PrevAndNext from '../../ReadComics/Parts/PrevAndNext';
import FirstAndLast from '../../ReadComics/Parts/FirstAndLast';
import '../MyHeroes/MyHeroes.css';
import '../../Catalog/Catalog.css';
import { useMyComicsState } from '../../../hooks/useComicsState';
const MyComics = ({
    pageSize
}) => {
    const { user } = useAuthContext();
    const [comics] = useMyComicsState(user._id);
    const [pagedComics, setPagedComics] = useState([]);
    let [pageIndex, setPageIndex] = useState(0);
    useEffect(() => {
        const paged = comics.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        setPagedComics(paged);
    }, [comics, pageIndex, pageSize]);
    return (
        <section className="my-heroes-page">
            <h1>{titles.MyComics}</h1>
            <div className="hero-container">

                {pagedComics.length > 0
                    ? pagedComics.map(x =>
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
        </section>
    );
}

export default MyComics;