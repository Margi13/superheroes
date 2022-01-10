import './ConfirmDialog.css';
import { alertMessages } from '../../../common/messagesConstantsBG'
import { buttonLabelsBG } from '../../../common/labelsConstatnsBG'
const ConfirmDialog = ({
    textMessage,
    show,
    onCancel,
    onSave
}) => {
    return (
        <>
            {show
                ? (
                    <section className="confirm-container warning">
                        <div>{alertMessages[textMessage]}</div>
                        <div>
                            <button className="success" onClick={onSave}>{buttonLabelsBG.Confirm}</button>
                            <button className="danger" onClick={onCancel}>{buttonLabelsBG.Cancel}</button>
                        </div>
                    </section>
                )
                : ''}
        </>
    );
}

export default ConfirmDialog;