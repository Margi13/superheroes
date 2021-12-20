import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'

const Header = () => {
    const {user} = useContext(AuthContext);
    let guestNavigation = (
        <div id="guest">
            <Link to="/login" href="/login">Login</Link>
            <Link to="/register" href="/register">Register</Link>
        </div>
    );
    let userNavigation = (
        <div id="user">
            <span>Hello, {user.email}</span>
            <Link to="/create" href="/create">Create Hero</Link>
            <Link to="/logout" href="/logout">Logout</Link>
        </div>

    );
    return (
        <header>
            <h1><Link to="/" className="home" href="/">ComicsWorld</Link></h1>
            <nav>
                <Link to="/catalog" href="/catalog" className="cloud-link">All heroes</Link>
                {user.email
                    ? userNavigation
                    : guestNavigation
                }
            </nav>
        </header>
    );
}

export default Header;