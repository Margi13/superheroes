import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as adminService from '../../../services/adminService';


import { alertMessages } from '../../../common/messagesConstantsBG';
import PendingCard from '../../Card/PendingCard';

const PendingComics = ({
    isAdmin,
    loggedUser
}) => {
    const navigate = useNavigate();
    const [comics, setComics] = useState([]);
    useEffect(() => {
        if (isAdmin) {
            adminService.getAllPendingComics()
                .then(data => {
                    if (!data.type) {
                        setComics(data);

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
    const noComicsElement = (
        <div>
            <p className="no-articles">{alertMessages.NoComics}</p>
        </div>
    );
    return (
        <div className="heroes-container">
            {comics.length > 0
                ? comics.map(x =>
                    <PendingCard
                        key={x._id}
                        type="comics"
                        data={x}
                        isAdmin={isAdmin}
                        user={loggedUser}
                    >
                        <h2>{x.title}</h2>
                        <p className="description">
                            {x.description.slice(0, 200) + '...'}
                        </p>

                    </PendingCard>)
                : noComicsElement
            }
        </div >
    );
}

export default PendingComics;