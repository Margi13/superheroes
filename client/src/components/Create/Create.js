import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HeroForm from '../Form/HeroForm';
import ComicsForm from '../Form/ComicsForm';

const Create = () => {
    return (
        <>
            <div className="choice-buttons buttons">
                <Link to="/create/hero" className="button" href="/create/hero">Герой</Link>
                <Link to="/create/comics" className="button" href="/create/comics">Комикс</Link>
            </div>
            <Routes>
                <Route path="/hero" element={<HeroForm type="create" />} />
                <Route path="/comics" element={<ComicsForm type="create" />} />
            </Routes>
        </>

    );
}

export default Create;