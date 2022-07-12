import { Link } from 'react-router-dom';
import '../Card.css';
import { useImageState } from '../../../hooks/useFirebaseState';
const ComicsCard = ({
	comics
}) => {
	const [imageUrl] = useImageState(comics._id, comics.coverPage, 'comics');

	return (
		<div className="comics-card card">
			<Link to={"/details/comics/" + comics._id} href="/details/comics" className="btn card-details-btn">
				<div className="card-image-wrap">
					<img src={imageUrl} alt="" />

					<div className="comics-info">
						<h3>{comics.title}</h3>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ComicsCard;