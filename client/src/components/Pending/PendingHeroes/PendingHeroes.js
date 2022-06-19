import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as adminService from '../../../services/adminService';


import { alertMessages } from '../../../common/messagesConstantsBG';
import PendingCard from '../../Card/PendingCard';

const PendingHeroes = ({
    isAdmin
}) => {
    const navigate = useNavigate();
    const [superheroes, setSuperheroes] = useState([]);
    useEffect(() => {
        if (isAdmin) {
            adminService.getAllPendingHeroes()
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
            navigate('/');
        }
    }, [isAdmin, navigate]);
    const noHeroesElement = (
        <div>
            <p className="no-articles">{alertMessages.NoSuperheroes}</p>
        </div>
    );
    return (
        <div className="heroes-container">
            {superheroes.length > 0
                ? superheroes.map(x =>
                    <PendingCard
                        key={x._id}
                        type="heroes"
                        data={x}
                        isAdmin={isAdmin}
                    >
                        <h2>{x.personName} ({x.heroName})</h2>
                        <p className="description">
                            {x.story.slice(0, 200) + '...'}
                        </p>

                    </PendingCard>)
                : noHeroesElement
            }
        </div >
    );
}

export default PendingHeroes;