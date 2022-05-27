// import { useEffect, useState } from 'react';

import HeroesCatalog from './HeroesCatalog';
import ComicsCatalog from './ComicsCatalog';
import './Catalog.css';
import { Routes, Route } from 'react-router-dom';
const Catalog = () => {

    //Here in Catalog will be the pagination
    return (
        <section className="catalog-page">
            <h1>Каталог</h1>
            <Routes>
                <Route path="/heroes" element={<HeroesCatalog pageSize={0} pageIndex={0} />} />
                <Route path="/comics" element={<ComicsCatalog pageSize={0} pageIndex={0} />} />
            </Routes>
            <h3 align="center" float="none">Страница 1/1</h3>
        </section>
    );
}

export default Catalog;