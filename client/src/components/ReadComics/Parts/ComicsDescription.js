import { DetailsHelper } from '../../Details/DetailsHelper';
import { useAuthContext } from '../../../contexts/AuthContext';
import { titles } from '../../../common/messagesConstantsBG';
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG';
import '../ReadComics.css';

const ComicsDescription = ({
    comics,
    setComics
}) => {
    const { user } = useAuthContext();
    const helper = DetailsHelper(user, comics, setComics, () => { }, 'comics');

    const reportButton = (
        <button className="likes-button danger" onClick={helper.reportButtonClick}>
            <i className="fa fa-regular fa-exclamation"></i>
            {buttonLabelsBG.Report}
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
                        ? ''
                        : reportButton
                    }
                </div>
            </section>
        </>
    );
}

export default ComicsDescription;