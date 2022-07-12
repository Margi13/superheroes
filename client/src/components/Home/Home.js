import './Home.css'
import TopHeroCard from './TopHeroCard';

import { titles } from '../../common/messagesConstantsBG';
import { useTopHeroesState } from '../../hooks/useHeroState';
const Home = () => {
    const [superheroes] = useTopHeroesState();

    return (
        <section className="comics-world">

            <div className="comics-message">
                <h2>{titles.Welcome}</h2>
            </div>
            <img src="./images/avatar-grooth.png" alt="hero" />

            <div className="home-page">
                <h1>{titles.TopHeroes}</h1>
                <div className="top-cards">
                    {superheroes
                        ? superheroes.map(x => <TopHeroCard key={x._id} hero={x} />)
                        : ''
                    }
                </div>
            </div>

        </section>
    );
}

export default Home;