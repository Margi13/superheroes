// import { useEffect, useState } from 'react';

import HeroesCatalog from './HeroesCatalog';
import ComicsCatalog from './ComicsCatalog';
import './Catalog.css';
import { Routes, Route } from 'react-router-dom';
const Catalog = () => {

    //Here in Catalog will be the pagination
    return (
        <section className="catalog-page">
            <Routes>
                <Route path="/heroes" element={<HeroesCatalog pageSize={2} pageIndex={0} />} />
                <Route path="/comics" element={<ComicsCatalog pageSize={2} pageIndex={0} />} />
            </Routes>
        </section>
    );
}

export default Catalog;