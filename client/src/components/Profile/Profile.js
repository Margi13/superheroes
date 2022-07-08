import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MyHeroes from './MyHeroes';
import MyComics from './MyComics';
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';

const Profile = () => {
    return (
        <>
            <div className="choice-buttons buttons">
                <Link to="/profile/my-heroes" className="button" href="/profile/my-heroes">{buttonLabelsBG.Superheroes}</Link>
                <Link to="/profile/my-comics" className="button" href="/profile/my-comics">{buttonLabelsBG.Comics}</Link>
                <Link to="/profile/my-docs" className="button" href="/profile/my-docs">{buttonLabelsBG.Documents}</Link>
            </div>
            <Routes>
                <Route path="/my-heroes" element={<MyHeroes />} />
                <Route path="/my-comics" element={<MyComics />} />
                <Route path="/my-docs" element={<></>} />
            </Routes>
        </>

    );
}

export default Profile;