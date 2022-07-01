import { Routes, Route } from 'react-router-dom';
import HeroForm from '../Form/HeroForm';
import ComicsForm from '../Form/ComicsForm';

const Edit = () => {
    return (
        <>
        <Routes>
            <Route path="/heroes/:id" element={<HeroForm type="edit" />} />
            <Route path="/comics/:id" element={<ComicsForm type="edit" />} />
        </Routes>
        </>
    );
}

export default Edit;