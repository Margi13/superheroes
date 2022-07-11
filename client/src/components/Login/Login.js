import { Link, useNavigate, Navigate } from 'react-router-dom';
import * as authService from '../../services/authService';

import { useAuthContext } from '../../contexts/AuthContext'
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import { formLabelsBG, placeholdersBG } from '../../common/labelsConstatnsBG';
import { titles, alertMessages } from '../../common/messagesConstantsBG';
import TextField from '../Form/Fields/TextField';
import PasswordField from '../Form/Fields/PasswordField';
import Form from '../Form/Form';
const Login = () => {
    const { login, isAuth } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();
    if (isAuth) {
        return <Navigate to="/" />
    }

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let email = formData.get('email');
        let password = formData.get('password');
        authService.login(email, password)
            .then((result) => {
                if (result.type) {
                    throw new Error('Error in login')
                }
                login(result);
                addNotification(alertMessages.LoginSuccess, typesColor.success);
                navigate('/')
            })
            .catch(error => {
                addNotification(alertMessages.LoginDenied, typesColor.error);
                console.log(error);
            });

    }
    return (
        <section id="login-page" className="auth">
            <div className="brand-logo">

                <h1>{titles.Login}</h1>
            </div>
            <Form type="login" onSubmit={onLoginHandler}>
                <TextField name="email"
                    label={formLabelsBG.Email}
                    placeholder={placeholdersBG.Email}
                />
                <PasswordField name="password"
                    label={formLabelsBG.Password}
                />
                <p className="field">
                    <span>{alertMessages.NoProfileMessage}:<Link to="/register" href="/register"><i className="fas fa-user-plus"></i></Link></span>
                </p>
            </Form>
        </section>
    );
}

export default Login;