import { useState } from 'react';
import { useParams } from 'react-router-dom';

import useComicsState from '../../hooks/useComicsState';

import ComicsHeader from './Parts/ComicsHeader';
import Pagination from './Parts/Pagination';
import ComicsDescription from './Parts/ComicsDescription';
import './ReadComics.css';

const ReadComics = () => {
	const { id } = useParams();
	const [comics, setComics] = useComicsState(id);
    const [page, setPage] = useState(0);

	return (
		<section className="read-container">
			<ComicsHeader title={comics.title} authorId={comics._ownerId}/>
            <Pagination comicsId={comics._id} urls={comics.imagesUrl} pageIndex={page} onChangePage={setPage}/>
            <hr/>
            <ComicsDescription comics={comics} setComics={setComics}/>
		</section>
	);
}

export default ReadComics;