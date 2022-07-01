import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';

import './MyCard.css';
import ButtonsBox from '../../Card/ButtonsBox';
import ImageBox from '../../Card/ImageBox';
import StatusBox from '../StatusBox';

const MyCard = ({
    children,
    id,
    status,
    type,
    image
}) => {
    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
        const imagePath = type === 'comics' ? `comics/${id}` : 'heroes';
        imageService.getImageFromFirebase(image, imagePath)
            .then(url => {
                setImageUrl(url);
            });
    }, [image, type, id]);

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