import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

import { useAuthContext } from '../../contexts/AuthContext'
import { typesColor, useNotificationContext } from '../../contexts/NotificationContext'
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
                addNotification('You logged in successfully', typesColor.success)
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            });

    }
    return (
        <section id="login-page" className="auth">
            <div className="brand-logo">

                <h1>Login</h1>
            </div>
            <form id="login" method="POST" onSubmit={onLoginHandler}>
                <div className="container">

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="steve_rogers@gmail.com" />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Sign in" />
                    <p className="field">
                        <span>Don't have profile? Just click <Link to="/register" href="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}

export default Login;