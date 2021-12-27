import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { navigationTitlesBG } from '../../common/labelsConstatnsBG';
import './Header.css';

const Header = () => {
    const { user } = useAuthContext();
    let guestNavigation = (
        <div id="guest" className="nav-container">
            <Link to="/login" href="/login" className="cloud-link guest-nav">{navigationTitlesBG.Login}</Link>
            <Link to="/register" href="/register" className="cloud-link guest-nav">{navigationTitlesBG.Register}</Link>
        </div>
    );
    let userNavigation = (
        <div id="user" className="nav-container">
            <Link to="/create" href="/create" className="cloud-link user-nav">{navigationTitlesBG.Create}</Link>
            <Link to="/my-heroes" href="/my-heroes" className="cloud-link user-nav">{navigationTitlesBG.MyHeroes}</Link>
            <Link to="/logout" href="/logout" className="cloud-link user-nav">{navigationTitlesBG.Logout}</Link>
        </div>

    );
    return (
        <header>
            <div className='logo-container'>
                <Link to="/" className="home" href="/" >
                    <img className="logo" src="/images/logo1.png" alt="BGComicsWorld" />
                </Link>
            </div>

            <nav>
                <div id="all" className="nav-container">
                    <Link to="/catalog" href="/catalog" className="cloud-link all-nav">{navigationTitlesBG.AllHeroes}</Link>
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