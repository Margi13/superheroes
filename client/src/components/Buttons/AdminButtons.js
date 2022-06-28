
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import * as adminService from '../../services/adminService';

const AdminButtons = ({
    id,
    hasApproveButton,
    enableApprove
}) => {
    const approveClickHandler = () => {
        adminService.approve(id, type)
            .then(result => {
                if (result.ok) {
                    navigate(`/admin/pending`);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
    const declineClickHandler = () => {
        const body = {
            reportMessage: 'Не отговаря на стандартите'
        }
        adminService.decline(id, body, type)
            .then(result => {
                if (result.ok) {
                    navigate(`/admin/pending`);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
    return (
        <div className="buttons">
            {hasApproveButton ? <button className={`${enableApprove ? 'button success' : 'disabled'}`} disabled={!enableApprove} onClick={approveClickHandler}>{buttonLabelsBG.Approve}</button> : ''}
            <button className="button danger" onClick={declineClickHandler}>{buttonLabelsBG.Decline}</button>
        </div>
    )
}

export default AdminButtons;