import { Route, Routes } from 'react-router-dom';

import HeroDetails from './HeroDetails';
import ComicsDetails from './ComicsDetails';
import './Details.css';
const Details = () => {

	return (
		<section className="details-container">
			<Routes>
				<Route path="/heroes/:id" element={<HeroDetails />} />
				<Route path="/comics/:id" element={<ComicsDetails />} />
			</Routes>
		</section>
	);
}

export default Details;