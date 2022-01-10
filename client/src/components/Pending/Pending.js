import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as adminService from '../../services/adminService';


import { alertMessages, titles } from '../../common/messagesConstantsBG';
import HeroCard from './HeroCard';
const Pending = () => {
    const navigate = useNavigate();
    const [superheroes, setSuperheroes] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const { user } = useAuthContext();
    useEffect(() => {
        adminService.getAdminId()
            .then(result => {
                if (result.adminId === user._id) {
                    setIsAdmin(true);
                    adminService.getAllPending()
                        .then(data => {
                            if (!data.type) {
                                setSuperheroes(data);

                            } else {
                                throw new Error(data.message);
                            }
                        })
                        .catch(error => {
                            console.log('Error:', error);
                        });
                }
                else {
                    setIsAdmin(false);
                    navigate('/');
                }
            });

    }, []);
    const noHeroesElement = (
        <div>
            <p className="no-articles">{alertMessages.NoSuperheroes}</p>
        </div>
    );
    return (
        <section className="my-heroes-page">
            <h1>{titles.Pending}</h1>

            {superheroes.length > 0
                ? superheroes.map(x => <HeroCard key={x._id} hero={x} isAdmin={isAdmin}/>)
                : noHeroesElement
            }


        </section>
    )
}
export default Pending;