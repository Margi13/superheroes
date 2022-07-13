import { Link, Routes, Route } from 'react-router-dom';

import PendingHeroes from './PendingHeroes';
import PendingComics from './PendingComics';
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
const Pending = () => {

    return (
        <section className="my-heroes-page">
            <div className="choice-buttons buttons">

                <Link to="/admin/pending/heroes" className="button" href="/admin/pending/heroes">{buttonLabelsBG.Superheroes}</Link>
                <Link to="/admin/pending/comics" className="button" href="/admin/pending/comics">{buttonLabelsBG.Comics}</Link>
            </div>
            <Routes>
                <Route path="/heroes" element={<PendingHeroes pageSize={5} />} />
                <Route path="/comics" element={<PendingComics pageSize={5} />} />
            </Routes>
        </section>
    )
}
export default Pending;