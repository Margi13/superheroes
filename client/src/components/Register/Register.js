import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import { formLabelsBG, buttonLabelsBG, placeholdersBG } from '../../common/labelsConstatnsBG';
import { titles, alertMessages } from '../../common/messagesConstantsBG';

function Register() {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let { email, password, rePassword } = Object.fromEntries(new FormData(e.currentTarget));
        if (password === rePassword) {

            authService.register(email, password)
                .then(authData => {
                    login(authData);
                    navigate('/');
                });
        } else {
            console.log('password missmatch')
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
                    <input type="email" id="email" name="email" placeholder={placeholdersBG.Email} />

                    <label htmlFor="pass">{formLabelsBG.Password}:</label>
                    <input type="password" name="password" id="register-password" />

                    <label htmlFor="con-pass">{formLabelsBG.RepeatPassword}:</label>
                    <input type="password" name="rePassword" id="rePassword" />

                    <input className="btn submit" type="submit" value={buttonLabelsBG.Register} />

                    <p className="field">
                        <span>{alertMessages.HasProfileMessage}: <Link to="/login" href="/login">Icon</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}

export default Register;