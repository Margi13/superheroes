import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as imageService from '../../../services/imageService';
import * as adminService from '../../../services/adminService';
import ImageBox from '../ImageBox';
import StatusBox from '../StatusBox';
import ButtonsBox from '../ButtonsBox';
import './PendingCard.css'

const PendingCard = ({
    children,
    type,
    data,
    isAdmin
}) => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
        const imageName = type === 'comics' ? data.coverPage : data.imageUrl;
        const imagePath = type === 'comics' ? `comics/${data._id}` : 'heroes';
        imageService.getImageFromFirebase(imageName, imagePath)
            .then(url => {
                setImageUrl(url);
            });
    }, [data, data._id, type, setImageUrl])
    const approveClickHandler = () => {
        if (isAdmin) {

            adminService.approve(data._id, data, type)
                .then(result => {
                    if (result.ok) {
                        navigate(`/admin/pending`);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
    const declineClickHandler = () => {
        if (isAdmin) {

            adminService.decline(data._id, data, type)
                .then(result => {
                    if (result.ok) {
                        navigate(`/admin/pending`);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
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

                        <ButtonsBox
                            id={data._id}
                            hasDetails={true}
                            urlFor={type}
                            role={{ isAdmin: true }}
                            hasFunctionalButtons={true}
                            onApprove={approveClickHandler}
                            onDecline={declineClickHandler}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PendingCard;