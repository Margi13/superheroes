import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { navigationTitlesBG } from '../../common/labelsConstatnsBG';
import * as adminService from '../../services/adminService';
import './Header.css';
import { useEffect, useState } from 'react/cjs/react.development';

const Header = () => {
    const { user } = useAuthContext();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        adminService.getAdminId()
            .then(result => {
                if (result.adminId) {
                    if (result.adminId === user._id) {
                        setIsAdmin(true);
                    }
                    else {
                        setIsAdmin(false);
                    }
                }
            });
    }, [user._id,setIsAdmin]);

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
            <Link to="/my-comics" href="/my-comics" className="cloud-link user-nav">{navigationTitlesBG.MyComics}</Link>
            <Link to="/logout" href="/logout" className="cloud-link user-nav">{navigationTitlesBG.Logout}</Link>
        </div>
    );
    let adminNavigation = (
        <div id="admin" className='nav-container'>
            <Link to="/admin/pending" href="/pending" className="cloud-link admin-nav">{navigationTitlesBG.Pending}</Link>
            <Link to="/logout" href="/logout" className="cloud-link admin-nav">{navigationTitlesBG.Logout}</Link>

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
                    <Link to="/catalog/heroes" href="/catalog/heroes" className="cloud-link all-nav">{navigationTitlesBG.AllHeroes}</Link>
                    <Link to="/catalog/comics" href="/catalog/comics" className="cloud-link all-nav">{navigationTitlesBG.AllComics}</Link>
                </div>
                {isAdmin
                    ? adminNavigation
                    : user.email
                        ? userNavigation
                        : guestNavigation

                }

            </nav>
        </header>
    );
}

export default Header;