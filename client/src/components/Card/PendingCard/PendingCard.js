import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as firebaseService from '../../../services/firebaseService';
import * as adminService from '../../../services/adminService';
import ImageBox from '../ImageBox';
import StatusBox from '../StatusBox';
import ButtonsBox from '../ButtonsBox';
import CreateWord from '../../Document/CreateWord';
import { useAuthContext } from '../../../contexts/AuthContext';
import './PendingCard.css'

const PendingCard = ({
    children,
    type,
    data
}) => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState();
    const [enableApprove, setEnableApprove] = useState(false);
    const { user } = useAuthContext();
    useEffect(() => {
        const imageName = type === 'comics' ? data.coverPage : data.imageUrl;
        const imagePath = type === 'comics' ? `comics/${data._id}` : 'heroes';
        firebaseService.getImageFromFirebase(imageName, imagePath)
            .then(url => {
                setImageUrl(url);
            });
    }, [data, type, enableApprove]);

    const approveClickHandler = () => {
        adminService.approve(data._id, data, type)
            .then(result => {
                if (result.type) {
                    throw new Error(result.message);
                }
                navigate(`/admin/pending`);
            })
            .catch(error => {
                console.log(error)
            });
    }

    const declineClickHandler = () => {
        const body = {
            adminId: user._id,
            reportMessage: 'Не отговаря на стандартите'
        }
        adminService.decline(data._id, body, type)
            .then(result => {
                if (result.type) {
                    throw new Error(result.message);
                }
                navigate(`/admin/pending`);
            })
            .catch(error => {
                console.log(error)
            });
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

                        <div align="right">
                            <CreateWord data={data} dataType={type} type="copyright" onCreate={() => setEnableApprove(true)} />
                        </div>
                        <ButtonsBox
                            id={data._id}
                            hasDetails={true}
                            urlFor={type}
                            role={{ isAdmin: true }}
                            hasFunctionalButtons={true}
                            enableApprove={enableApprove}
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