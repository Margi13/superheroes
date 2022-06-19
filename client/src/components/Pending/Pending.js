import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as adminService from '../../services/adminService';


import { titles } from '../../common/messagesConstantsBG';
import PendingHeroes from './PendingHeroes';
import PendingComics from './PendingComics';
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
            <h1>{titles.Pending}</h1>
            <Link to="/admin/pending/heroes" href="/admin/pending/heroes">Герой</Link>
            <Link to="/admin/pending/comics" href="/admin/pending/comics">Комикс</Link>
            <Routes>
                <Route path="/heroes" element={<PendingHeroes pageSize={0} pageIndex={0} isAdmin={isAdmin} loggedUser={user} />} />
                <Route path="/comics" element={<PendingComics pageSize={0} pageIndex={0} isAdmin={isAdmin} loggedUser={user}/>} />
            </Routes>
            <h3 align="center" float="none">Страница 1/1</h3>



        </section>
    )
}
export default Pending;