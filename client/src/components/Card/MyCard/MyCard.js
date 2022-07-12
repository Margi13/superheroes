import './MyCard.css';
import ButtonsBox from '../ButtonsBox';
import ImageBox from '../ImageBox';
import StatusBox from '../StatusBox';
import { useImageState } from '../../../hooks/useFirebaseState';

const MyCard = ({
    children,
    id,
    status,
    type,
    image
}) => {
    const [imageUrl] = useImageState(id, image, type);

    return (
        <div className="my-card">
            <StatusBox status={status} />

            <div className="data-info">

                <ImageBox className="data-img" imageUrl={imageUrl} />
                <div className="data-container">
                    <div>
                        {children}
                    </div>

                    <ButtonsBox
                        id={id}
                        hasDetails={true}
                        urlFor={type}
                        role={{ isOwner: true }}
                        hasFunctionalButtons={false}
                    />
                </div>
            </div>

        </div>

    );
}

export default MyCard;