import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as adminService from '../../services/adminService';

import PendingHeroes from './PendingHeroes';
import PendingComics from './PendingComics';
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
const Pending = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const { user } = useAuthContext();
    useEffect(() => {
        adminService.getAdminId()
            .then(result => {
                if (result.adminId === user._id) {
                    setIsAdmin(true);
                }
                else {
                    setIsAdmin(false);
                    navigate('/');
                }
            });

    }, [user._id, navigate]);

    return (
        <section className="my-heroes-page">
            <div className="choice-buttons buttons">

                <Link to="/admin/pending/heroes" className="button" href="/admin/pending/heroes">{buttonLabelsBG.Superheroes}</Link>
                <Link to="/admin/pending/comics" className="button" href="/admin/pending/comics">{buttonLabelsBG.Comics}</Link>
            </div>
            <Routes>
                <Route path="/heroes" element={<PendingHeroes pageSize={0} pageIndex={0} isAdmin={isAdmin} loggedUser={user} />} />
                <Route path="/comics" element={<PendingComics pageSize={0} pageIndex={0} isAdmin={isAdmin} loggedUser={user} />} />
            </Routes>
        </section>
    )
}
export default Pending;