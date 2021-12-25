import { useContext } from 'react';
import {useNavigate} from 'react-router'
import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext'

function Register() {
    const navigate = useNavigate();
    const {login} = useContext(useAuthContext);
    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let {email, password, rePassword} = Object.fromEntries(new FormData(e.currentTarget));
        if(password === rePassword){

            authService.register(email, password)
            .then(authData=>{
                login(authData);
                navigate('/');
            });
        }else{
            console.log('password missmatch')
        }
    }
    return (
        <section id="register-page" className="content auth">
            <div className="brand-logo">
                <h1>Register</h1>
            </div>
            <form id="register" method="POST" onSubmit={registerSubmitHandler}>
                <div className="container">


                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="steve_rogers@email.com" />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="rePassword" id="rePassword" />

                    <input className="btn submit" type="submit" value="Sign up" />


                    <p className="field">
                    <span>If you already have profile click <Link to="/login" href="/login">here</Link></span>
                </p>
                </div>
            </form>
        </section>
    );
}

export default Register;