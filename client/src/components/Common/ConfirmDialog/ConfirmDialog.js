import './ConfirmDialog.css';
const ConfirmDialog = ({
    show,
    onCancel,
    onSave
}) => {
    return (
        <>
            {show
                ? (
                    <section className="modal-container">
                        <div> Do you want to delete this?</div>
                        <button onClick={onSave}>Yes</button>
                        <button onClick={onCancel}>Cancel</button>
                    </section>
                )
                : ''}
        </>
    );
}

export default ConfirmDialog;