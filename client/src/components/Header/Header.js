import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { navigationTitlesBG } from '../../common/labelsConstatnsBG';
import './Header.css';

const Header = () => {
    const { user, isAdmin } = useAuthContext();

    const guestNavigation = (
        <div id="guest" className="nav-container">
            <Link to="/login" href="/login" className="cloud-link guest-nav"><img className="cloud-img" src="/images/navigation/login.png" alt={navigationTitlesBG.Login}/></Link>
            <Link to="/register" href="/register" className="cloud-link guest-nav"><img className="cloud-img" src="/images/navigation/register.png" alt={navigationTitlesBG.Register}/></Link>
        </div>
    );
    const userNavigation = (
        <div id="user" className="nav-container">
            <Link to="/create" href="/create" className="cloud-link user-nav"><img className="cloud-img" src="/images/navigation/create.png" alt={navigationTitlesBG.Create}/></Link>
            <Link to="/profile" href="/profile" className="cloud-link user-nav"><img className="cloud-img" src="/images/navigation/profile.png" alt={navigationTitlesBG.Profile}/></Link>
            <Link to="/logout" href="/logout" className="cloud-link user-nav"><img className="cloud-img" src="/images/navigation/logout.png" alt={navigationTitlesBG.Logout}/></Link>
        </div>
    );
    const adminNavigation = (
        <div id="admin" className='nav-container'>
            <Link to="/admin/pending" href="/pending" className="cloud-link admin-nav"><img className="cloud-img" src="/images/navigation/pending.png" alt={navigationTitlesBG.Pending}/></Link>
            <Link to="/admin/reports" href="/reports" className="cloud-link admin-nav"><img className="cloud-img" src="/images/navigation/reports.png" alt={navigationTitlesBG.Reports}/></Link>
            <Link to="/logout" href="/logout" className="cloud-link admin-nav"><img className="cloud-img" src="/images/navigation/logout.png" alt={navigationTitlesBG.Logout}/></Link>
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
                    <Link to="/catalog/heroes" href="/catalog/heroes" className="cloud-link all-nav"><img className="cloud-img" src="/images/navigation/all-comics.png" alt={navigationTitlesBG.AllHeroes}/></Link>
                    <Link to="/catalog/comics" href="/catalog/comics" className="cloud-link all-nav"><img className="cloud-img" src="/images/navigation/all-heroes.png" alt={navigationTitlesBG.AllComics}/></Link>
                </div>
                {isAdmin
                    ? adminNavigation
                    : user.accessToken
                        ? userNavigation
                        : guestNavigation

                }

            </nav>
        </header>
    );
}

export default Header;