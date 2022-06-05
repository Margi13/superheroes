import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { titles } from '../../common/messagesConstantsBG';

const FormContainer = ({
    children,
    onSubmit,
    type
}) => {
    return (
        <form id={type} method="POST" onSubmit={onSubmit}>
            <div className="container">
                <h1>{type === 'create' ? titles.Create : titles.Edit}</h1>

                {children}

                <input className="btn submit" type="submit" value={type === 'create' ? buttonLabelsBG.Create : buttonLabelsBG.Edit} />
            </div>
        </form>
    );
}

export default FormContainer;