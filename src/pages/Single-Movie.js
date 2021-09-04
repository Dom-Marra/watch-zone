//Stlying
import '../scss/pages/SingleMovie.scss';

//React & React Router
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

//Globals
import { API_FETCH, API_TOKEN, API_IMG} from '../globals/globals';
import { GlobalContext } from '../store/GlobalState';
import isFav from "../utils/isFavourite";
import parseDate from '../utils/parseDate';

//Components
import MovieRating from '../components/Movie-Rating';
import MovieFavourite from '../components/Movie-Favourite';

//Images
import genericMoviePoster from '../images/Generic-Movie-Poster-Large.jpg';

function SingleMovie() {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const { favourites } = useContext(GlobalContext);
    const { addToFavs, removeFromFavs } = useContext(GlobalContext);

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await fetch(`${API_FETCH + id}?language=en-US`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_TOKEN
                }
            });
    
            const responseData = await res.json();
            setMovie(responseData);
        }
    
        fetchMovie();
    }, [id]);

    function toggleFavouriteMovie() {
        if (isFav(favourites, movie.id)) removeFromFavs(movie.id);
        else addToFavs(movie);
    }

    return (
        movie && 
        <section className="single-movie-section">

            <div className="single-movie-wrapper">
                <div className="image-container" style={{backgroundImage: `url(${API_IMG + '/original' + movie.backdrop_path})`}}>
                    <img src={movie.poster_path ? API_IMG + '/original' + movie.poster_path : genericMoviePoster} 
                        alt={`Movie poster of ${movie.title}`} />
                </div>
                

                <div className="movie-details">

                    <div className="movie-details-top">
                        <h2>{movie.title}</h2>

                        <div className="icons">
                            <MovieRating rating={movie.vote_average}/>
                            <MovieFavourite favourited={isFav(favourites, movie.id)} onClick={toggleFavouriteMovie} />
                        </div>
                    </div>

                    <p className="overview">{movie.overview ? movie.overview : 'No description available.'}</p>

                    <p className="release-duration">
                        Air date: {movie.release_date ? parseDate(movie.release_date) : 'Unkown'}
                        <br />
                        Duration: {movie.runtime ? movie.runtime + 'mins' : 'Unkown'}
                    </p>

                    {movie.genres && <ul className="genres">
                        {movie.genres.map(genre => <li key={genre.id} className="genre">{genre.name}</li>)}
                    </ul>}
                </div>
            </div>
        </section>
    )
}

export default SingleMovie;