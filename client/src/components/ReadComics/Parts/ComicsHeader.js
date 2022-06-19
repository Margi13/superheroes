import { useAuthContext } from '../../../contexts/AuthContext';
import { titles } from '../../../common/messagesConstantsBG';
import '../ReadComics.css';

const ComicsHeader = ({
    title
}) => {
    const { user } = useAuthContext();
    return (
        <>
            <section className="comics-header">
                <h1>{titles.Title}: <span>{title}</span></h1>
                <h1>{titles.Author}: <span>{user.email.split('@')[0]}</span></h1>
            </section>
        </>
    );
}

export default ComicsHeader;