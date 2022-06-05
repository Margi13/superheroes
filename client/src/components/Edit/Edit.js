import { Routes, Route } from 'react-router-dom';
import HeroForm from '../Form/Hero/HeroForm';
import ComicsForm from '../Form/Comics/ComicsForm';

const Edit = () => {
    return (
        <>
        <Routes>
            <Route path="/hero/:id" element={<HeroForm type="edit" />} />
            <Route path="/comics/:id" element={<ComicsForm type="edit" />} />
        </Routes>
        </>
    );
}

export default Edit;