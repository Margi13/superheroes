import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { titles } from '../../common/messagesConstantsBG';

const FormContainer = ({
    children,
    onSubmit,
    type
}) => {
    let buttonLabel;
    if (type === 'create') {
        buttonLabel = buttonLabelsBG.Create;
    } else if (type === 'edit') {
        buttonLabel = buttonLabelsBG.Edit;
    } else if (type === 'login') {
        buttonLabel = buttonLabelsBG.Login;
    } else if (type === 'register') {
        buttonLabel = buttonLabelsBG.Register;
    } else {
        buttonLabel = undefined;
    }
    return (
        <form id={type} method="POST" onSubmit={onSubmit}>
            <div className="container">
                {type === 'create'
                    ? <h1>{titles.Create}</h1>
                    : type === 'edit'
                        ? <h1>{titles.Edit}</h1> : ''}

                {children}

                <input className="btn submit" type="submit" value={buttonLabel} />
            </div>
        </form>
    );
}

export default FormContainer;