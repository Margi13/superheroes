import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { buttonLabelsBG, formLabelsBG } from '../../../common/labelsConstatnsBG';
import { useAuthContext } from '../../../contexts/AuthContext';
import * as imageService from '../../../services/imageService';
import * as adminService from '../../../services/adminService';

import './HeroCard.css'

const HeroCard = ({
    hero,
    isAdmin
}) => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        imageService.getImageFromFirebase(hero.imageUrl)
            .then(url => {
                setImageUrl(url);
            });
    }, [hero.imageUrl, setImageUrl])

    const approveClickHandler = () => {
        if (isAdmin) {

            adminService.approve(hero._id, hero)
                .then(result => {
                    if (result.ok) {
                        navigate('/catalog');
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
    const declineClickHandler = () => {
        if (isAdmin) {

            adminService.decline(hero._id, hero)
                .then(result => {
                    if (result.ok) {
                        navigate('/catalog');
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
    return (
        <div className="heroes-container">
            <div className="pending-hero">
                <div className="hero-info">
                    <img src={imageUrl} alt="" />
                    <h2>{hero.personName} ({hero.heroName})</h2>
                    <span className="age">{hero.age} {formLabelsBG.Age.toLocaleLowerCase()}</span>
                    <span className="kind">{hero.kind}</span>
                    <p className="text">
                        {hero.story}
                    </p>

                    <Link to={"/details/" + hero._id} href="/details" className="pending-button">{buttonLabelsBG.Details}</Link>
                    {isAdmin
                        ? <>
                            <button className="pending-button success" onClick={approveClickHandler}>Yes</button>
                            <button className="pending-button danger" onClick={declineClickHandler}>No</button>
                        </>
                        : <></>
                    }

                </div>
            </div>
        </div >
    );
}

export default HeroCard;