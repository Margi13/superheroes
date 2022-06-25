import { useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useAuthContext } from '../../contexts/AuthContext';

import useComicsState from '../../hooks/useComicsState';
// import * as adminService from '../../services/adminService';

import ComicsHeader from './Parts/ComicsHeader';
import Pagination from './Parts/Pagination';
import ComicsDescription from './Parts/ComicsDescription';
import './ReadComics.css';

const ReadComics = () => {
	// const navigate = useNavigate();
	const { id } = useParams();
	// const { user } = useAuthContext()
	// const [isAdmin, setIsAdmin] = useState(false);
	const [comics, setComics] = useComicsState(id);
	const [page, setPage] = useState(0);
	// useEffect(() => {
	// 	adminService.getAdminId()
	// 		.then(result => {
	// 			if (result.adminId === user._id) {
	// 				setIsAdmin(true);
	// 			}
	// 			else {
	// 				setIsAdmin(false);
	// 				if (!user || (comics._ownerId !== user._id && comics.status !== 1)) {
	// 					console.log(user, comics._ownerId === user._id, comics.status)
	// 					navigate('/')
	// 				}
	// 			}
	// 		});
	// }, [isAdmin, comics.status, comics._ownerId, user._id, user, navigate]);

	return (
		<section className="read-container">
			<ComicsHeader title={comics.title} authorId={comics._ownerId} />
			<Pagination comicsId={comics._id} urls={comics.imagesUrl} pageIndex={page} onChangePage={setPage} />
			<hr />
			<ComicsDescription comics={comics} setComics={setComics} />
		</section>
	);
}

export default ReadComics;