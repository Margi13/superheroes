import { useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';

import ConfirmDialog from '../../Common/ConfirmDialog/ConfirmDialog';
import { DetailsHelper } from '../../Details/DetailsHelper';
import '../../Details/Details.css';
import ImageBox from '../../Card/ImageBox';
import AdminButtons from '../../Buttons/AdminButtons';
import OwnerButtons from '../../Buttons/OwnerButtons';
import UserButtons from '../../Buttons/UserButtons';

const DetailsCard = ({
    children,
    type,
    image,
    data,
    setData
}) => {
    const { user } = useAuthContext();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const helper = DetailsHelper(user, data, setData, setShowDeleteDialog, type);

    const role = {
        isGuest: user._id ? user._id.length <= 0 : true,
        isOwner: user._id && (user._id === data._ownerId) ? true : false
    };
    return (
        <div className="info-section">

            <div className="hero-header">
                <ImageBox className="hero-img" imageUrl={image} />

                {children}
            </div>

            <section className='buttons-container'>
                <UserButtons
                    id={data._id}
                    urlFor={type}
                    hasDetailsButton={true}
                    hasLikesButton={type === "heroes"}
                    canLike={!role.isOwner && !role.isGuest && !role.isAdmin}
                    likesCount={type === "heroes" ? data.likes?.length || 0 : undefined}
                    hasReportButton={true}
                    onLike={helper.likeButtonClick}
                    onReport={helper.reportButtonClick}
                >
                    {role.isOwner
                        ? <OwnerButtons id={data._id} urlFor={type} onDelete={helper.deleteClickHandler} />
                        : role.isAdmin
                            ? <AdminButtons id={data._id} hasApproveButton={false} />
                            : ''}
                </UserButtons>
            </section>
            <ConfirmDialog
                textMessage="DeleteConfirm"
                show={showDeleteDialog}
                onCancel={() => setShowDeleteDialog(false)}
                onOk={helper.deleteHandler}
            />

        </div>
    );
}

export default DetailsCard;