import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router'
import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import { formLabelsBG, placeholdersBG } from '../../common/labelsConstatnsBG';
import { titles, alertMessages, validationMessages } from '../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import { ChangeHandlers } from '../Form/Validation/UserValidationHelper';
import Form from '../Form/Form';
import TextField from '../Form/Fields/TextField';
import PasswordField from '../Form/Fields/PasswordField';

const initialErrorState = { email: null, password: null, rePassword: null };

const Register = () => {
    const navigate = useNavigate();
    const { login, isAuth } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const [errors, setErrors] = useState(initialErrorState);
    const handlers = ChangeHandlers(setErrors);
    if (isAuth) {
        return <Navigate to="/" />
    }
    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let { email, password, rePassword } = Object.fromEntries(new FormData(e.currentTarget));

        if (email === '' || password === '' || rePassword === '') {
            addNotification(alertMessages.EnteredNoData, typesColor.error);
            return;
        }
        if (errors.email || errors.password || errors.rePassword) {
            addNotification(alertMessages.EnteredInvalidData, typesColor.error);
            return;
        }

        if (password === rePassword) {

            authService.register(email, password)
                .then(authData => {
                    login(authData);
                    navigate('/');
                });
        } else {
            addNotification(validationMessages.PasswordMissmatch, typesColor.error);
        }
    }
    return (
        <section id="register-page" className="content auth">
            <div className="brand-logo">
                <h1>{titles.Register}</h1>
            </div>
            <Form type="register" onSubmit={registerSubmitHandler}>
                <>
                    <TextField name="email"
                        label={formLabelsBG.Email}
                        placeholder={placeholdersBG.Email}
                        changeHandler={handlers.emailChangeHandler}
                        errorMessage={errors.email}
                    />

                    <PasswordField name="password"
                        label={formLabelsBG.Password}
                        changeHandler={handlers.passwordChangeHandler}
                        errorMessage={errors.password}
                    />

                    <PasswordField name="rePassword"
                        label={formLabelsBG.RepeatPassword}
                    />

                    <p className="field">
                        <span>{alertMessages.HasProfileMessage}: <Link to="/login" href="/login"><i className="fas fa-sign-in-alt"></i></Link></span>
                    </p>
                </>
            </Form>
        </section>
    );
}

export default Register;