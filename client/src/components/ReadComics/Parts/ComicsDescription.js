import { DetailsHelper } from '../../Details/DetailsHelper';
import { useAuthContext } from '../../../contexts/AuthContext';
import '../ReadComics.css';
import { titles } from '../../../common/messagesConstantsBG';

const ComicsDescription = ({
    comics,
    setComics
}) => {
    const { user } = useAuthContext();
    const helper = DetailsHelper(user, comics, setComics, () => { }, 'comics');
    const ownerLikes = (
        <div className="likes-div">
            <i className="fa fa-regular fa-heart"></i>
            {(comics.likes || []).length}
        </div>
    )
    const likeButton = (
        <button className="likes-button" onClick={helper.likeButtonClick}>
            <i className="fa fa-regular fa-heart"></i>
            {(comics.likes || []).length}
        </button>
    )
    return (
        <>
            <h1>{comics.title}</h1>
            <section className="comics-description">
                <h1 align="center">{titles.Description}</h1>
                <p className='description-paragraph'>{comics.description}</p>
                <div align="right">
                    {user._id === comics._ownerId
                        ? ownerLikes
                        : likeButton
                    }
                </div>
            </section>
        </>
    );
}

export default ComicsDescription;