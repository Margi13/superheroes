import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

import { useAuthContext } from '../../contexts/AuthContext'
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext';
import {formLabelsBG,buttonLabelsBG,placeholdersBG} from '../../common/labelsConstatnsBG';
import {titles, alertMessages} from '../../common/messagesConstantsBG';
const Login = () => {
    const { login } = useAuthContext();
    const {addNotification} = useNotificationContext();
    const navigate = useNavigate();

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let email = formData.get('email');
        let password = formData.get('password');
        authService.login(email, password)
            .then((authData) => {
                login(authData);
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
            <form id="login" method="POST" onSubmit={onLoginHandler}>
                <div className="container">

                    <label htmlFor="email">{formLabelsBG.Email}:</label>
                    <input type="email" id="email" name="email" placeholder={placeholdersBG.Email} />

                    <label htmlFor="login-pass">{formLabelsBG.Password}:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value={buttonLabelsBG.Login} />
                    <p className="field">
                        <span>{alertMessages.NoProfileMessage}:<Link to="/register" href="/register">Icon</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}

export default Login;