import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router'
import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import { formLabelsBG, buttonLabelsBG, placeholdersBG } from '../../common/labelsConstatnsBG';
import { titles, alertMessages, validationMessages } from '../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import { ChangeHandlers } from '../Form/Validation/UserValidationHelper';

const initialErrorState = { email: null, password: null, rePassword: null };

const Register = () => {
    const navigate = useNavigate();
    const { login, isAuth } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const [errors, setErrors] = useState(initialErrorState);
    const handlers = ChangeHandlers(setErrors);
    if(isAuth){
        return <Navigate to="/"/>
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
            <form id="register" method="POST" onSubmit={registerSubmitHandler}>
                <div className="container">

                    <label htmlFor="email">{formLabelsBG.Email}:</label>
                    <input type="email" id="email" name="email"
                        placeholder={placeholdersBG.Email}
                        onBlur={handlers.emailChangeHandler}
                        className={errors.email ? 'error' : 'no-error'} />
                    <span className={errors.email ? 'show error' : 'hide no-error'}>{errors.email}</span>

                    <label htmlFor="pass">{formLabelsBG.Password}:</label>
                    <input type="password" name="password" id="register-password"
                        onBlur={handlers.passwordChangeHandler}
                        className={errors.password ? 'error' : 'no-error'} />
                    <span className={errors.password ? 'show error' : 'hide no-error'}>{errors.password}</span>

                    <label htmlFor="con-pass">{formLabelsBG.RepeatPassword}:</label>
                    <input type="password" name="rePassword" id="rePassword" />

                    <input className="btn submit" type="submit" value={buttonLabelsBG.Register} />

                    <p className="field">
                        <span>{alertMessages.HasProfileMessage}: <Link to="/login" href="/login"><i className="fas fa-sign-in-alt"></i></Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}

export default Register;