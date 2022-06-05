import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HeroForm from '../Form/Hero/HeroForm';
import ComicsForm from '../Form/Comics/ComicsForm';

const Create = () => {
    return (
        <>
            <Link to="/create/hero" href="/create/hero">Герой</Link>
            <Link to="/create/comics" href="/create/comics">Комикс</Link>
            <Routes>
                <Route path="/hero" element={<HeroForm type="create" />} />
                <Route path="/comics" element={<ComicsForm type="create" />} />
            </Routes>
        </>

    );
}

export default Create;