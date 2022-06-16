import { alertMessages } from '../../../common/messagesConstantsBG';
import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';

import './MyCard.css';
import ButtonsBox from '../../Card/ButtonsBox';
import ImageBox from '../../Card/ImageBox';

const MyCard = ({
    children,
    id,
    title,
    status,
    type,
    image
}) => {
    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
        const imagePath = type === 'comics' ? `comics/${title}` : 'heroes';
        imageService.getImageFromFirebase(image, imagePath)
            .then(url => {
                setImageUrl(url);
            });
    }, [image]);

    const statusColor = status === 1 ? 'green' : status === 0 ? 'orange' : 'red';
    return (
        <div className="my-card">
            <div className={"status " + statusColor}>
                {status === 1
                    ? <span>{alertMessages.Approved}</span>
                    : status === 0
                        ? <span>{alertMessages.Pending}</span>
                        : <span>{alertMessages.Declined}</span>
                }
            </div>
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