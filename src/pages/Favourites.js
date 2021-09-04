//Styling
import '../scss/pages/Favourites.scss';

//Global State
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalState';

//Components
import MovieCard from '../components/Movie-Card';

//Icons
import { Heart } from 'react-feather';

function Favourites() {

    const { favourites } = useContext(GlobalContext);

    return (
        <section className="favourites-section">
            <h2>Favourites</h2>
            {favourites.length === 0 ? 
                <p className="no-fav-message">
                    You currently don’t have any favourite movies. Visit the Home page 
                    and click on the <span className="icon heart"><Heart /></span> icon to favourite a movie.
                </p> :

                <div className="movies-wrapper">
                    {favourites.map((movie, i) => 
                        <MovieCard 
                            key={i}
                            movie={movie}
                        />
                    )}
                </div>
                
            }
        </section>
    )
}

export default Favourites;