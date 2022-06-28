import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';
import ImageBox from '../ImageBox';
import StatusBox from '../StatusBox';
import CreateWord from '../../Document/CreateWord';
import './PendingCard.css'
import AdminButtons from '../../Buttons/AdminButtons';
import UserButtons from '../../Buttons/UserButtons';

const PendingCard = ({
    children,
    type,
    data,
    isAdmin,
    user
}) => {
    const [imageUrl, setImageUrl] = useState();
    const [enableApprove, setEnableApprove] = useState(false);
    useEffect(() => {
        const imageName = type === 'comics' ? data.coverPage : data.imageUrl;
        const imagePath = type === 'comics' ? `comics/${data._id}` : 'heroes';
        imageService.getImageFromFirebase(imageName, imagePath)
            .then(url => {
                setImageUrl(url);
            });
    }, [data, data._id, type, setImageUrl, enableApprove])
    return (
        <div className="heroes-container admin-card">
            <div className="pending-card">
                <StatusBox status={data.status} />

                <div className="data-info">

                    <ImageBox className="data-img" imageUrl={imageUrl} />
                    <div className="data-container">
                        <div>
                            {children}
                        </div>

                        <div align="right">
                            <CreateWord data={data} dataType={type} type="copyright" onCreate={() => setEnableApprove(true)} />
                        </div>
                        <section className='buttons-container'>
                            <UserButtons id={data._id} hasDetailsButton={true} urlFor={type}>
                                <AdminButtons id={data._id} hasApproveButton={true} enableApprove={enableApprove} />
                            </UserButtons>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PendingCard;