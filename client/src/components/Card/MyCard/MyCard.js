import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';

import './MyCard.css';
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

                    <section className='buttons-container'>
                        <UserButtons id={id} hasDetailsButton={true} urlFor={type}>
                            {/* Add onDelete */}
                            <OwnerButtons id={id} urlFor={type} onDelete={() => { }} />
                        </UserButtons>
                    </section>
                </div>
            </div>

        </div>

    );
}

export default MyCard;