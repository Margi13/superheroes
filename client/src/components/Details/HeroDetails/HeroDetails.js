import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useHeroState from '../../../hooks/useHeroState';
import { useAuthContext } from '../../../contexts/AuthContext';

import * as likeService from '../../../services/likeService';
import * as imageService from '../../../services/imageService';

import ConfirmDialog from '../../Common/ConfirmDialog/ConfirmDialog';
import { buttonLabelsBG, formLabelsBG } from '../../../common/labelsConstatnsBG';
import { titles } from '../../../common/messagesConstantsBG';
import { DetailsHelper } from '../DetailsHelper';
import '../Details.css';
const HeroDetails = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [superhero, setSuperhero] = useHeroState(id);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const helper = DetailsHelper(user, superhero, setSuperhero, setShowDeleteDialog);

    useEffect(() => {
        imageService.getImageFromFirebase(superhero.imageUrl)
            .then(url => {
                setImageUrl(url);
            })
            .catch(error => {
                console.log(error);
            });
        likeService.getHeroLikes(id)
            .then((likes) => {
                setSuperhero(state => ({ ...state, likes }))

            })
            .catch(error => {
                console.log(error);
            });
    }, [id, setSuperhero, superhero.imageUrl, setImageUrl])

    const ownerButtons = (
        <div className="buttons">
            <Link to={`/edit/hero/${superhero._id}`} href="/edit/hero" className="button">{buttonLabelsBG.Edit}</Link>
            <button className="button" onClick={helper.deleteClickHandler}>{buttonLabelsBG.Delete}</button>
        </div>
    )
    const userButtons = (
        <div className="buttons">
            <button className="button" onClick={helper.likeButtonClick}>{buttonLabelsBG.Like}</button>
        </div>
    )
    return (
        <section className="hero-details">
            <h1>{titles.Details}</h1>
            <div className="info-section">

                <div className="hero-header">
                    <img className="hero-img" src={imageUrl || '../images/avatar-grooth.png'} alt="" />
                    {/* if names are equal => we write it only one time */}
                    {superhero.heroName === superhero.personName
                        ? <h1>{superhero.heroName}</h1>
                        : <h1>{superhero.heroName} ({superhero.personName})</h1>
                    }
                    <span className="age">{superhero.age} {formLabelsBG.Age.toLocaleLowerCase()}</span>
                    <span className="kind">{superhero.kind || 'Човек'}</span>
                </div>

                <p className="text">
                    {superhero.story}
                </p>

                <div className="likes">
                    {/* <img className="hearts" /> */}
                    <span id="total-likes">{titles.Likes}: {superhero.likes?.length || 0}</span>
                </div>

                {user._id && (user._id === superhero._ownerId
                    ? ownerButtons
                    : userButtons
                )}
                <ConfirmDialog
                    textMessage="DeleteConfirm"
                    show={showDeleteDialog}
                    onCancel={() => setShowDeleteDialog(false)}
                    onSave={helper.deleteHandler} />

            </div>
        </section>
    );
}

export default HeroDetails;