import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'

const Header = () => {
    const { user } = useContext(AuthContext);
    let guestNavigation = (
        <div id="guest">
            <Link to="/login" href="/login" className="cloud-link">Login</Link>
            <Link to="/register" href="/register" className="cloud-link">Register</Link>
        </div>
    );
    let userNavigation = (
        <div id="user">
            <Link to="/create" href="/create" className="cloud-link">Create</Link>
            <Link to="/logout" href="/logout" className="cloud-link">Logout</Link>
        </div>

    );
    return (
        <header>
            <Link to="/" className="home" href="/">
                <img className="logo" src="/images/logo.png" alt="ComicsWorld" />
            </Link>

            <nav>
                <div id="all">
                    <Link to="/catalog" href="/catalog" className="cloud-link">All heroes</Link>
                </div>
                {user.email
                    ? userNavigation
                    : guestNavigation
                }
            </nav>
        </header>
    );
}

export default Header;