import HeroesCatalog from './HeroesCatalog';
import ComicsCatalog from './ComicsCatalog';
import './Catalog.css';
import { Routes, Route } from 'react-router-dom';
const Catalog = () => {

    return (
        <section className="catalog-page">
            <Routes>
                <Route path="/heroes" element={<HeroesCatalog pageSize={15} />} />
                <Route path="/comics" element={<ComicsCatalog pageSize={15} />} />
            </Routes>
        </section>
    );
}

export default Catalog;