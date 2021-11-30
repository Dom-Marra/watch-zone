//Styling
import '../scss/components/Movie-Card.scss';

//React & Global State & Router
import { GlobalContext } from '../store/GlobalState';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

//React Transition
import { Transition } from 'react-transition-group';

//Globals
import isFav from '../utils/isFavourite';
import parseDate from '../utils/parseDate';
import { API_IMG } from '../globals/globals';

//Components
import MovieRating from './Movie-Rating';
import MovieFavourite from './Movie-Favourite';

//Images
import genericMoviePoster from '../images/Generic-Movie-Poster-Small.jpg';

function MovieCard ({movie}) {
    const moviePosterPath = API_IMG + 'w342';

    const { favourites } = useContext(GlobalContext);
    const { addToFavs, removeFromFavs } = useContext(GlobalContext);

    const nodeRef = useRef(null);
    const [linkFocused, setLinkFocused] = useState(false);
    const [cardStyle, setCardStyle] = useState({});
    const [inProp, setInProp] = useState(false);
    const [transitionStyle, setTransitionStyle] = useState({
        entered:  { top: '6rem' },
        entering:  { top: '6rem' },
    });
    const [defaultStyle, setDefaultStyle] = useState({
        transition: 'top 0.25s ease-in-out'
    });

    
    const toggleOverviewClamp = useCallback(() => {
        overviewEl.current.textContent = movie.overview ? movie.overview : 'No Description available.';

        if (overviewEl.current.offsetHeight < overviewEl.current.scrollHeight) {
            
            while (overviewEl.current.offsetHeight < overviewEl.current.scrollHeight) {
                overviewEl.current.textContent = overviewEl.current.textContent.slice(0, -1);
            }

            overviewEl.current.textContent = overviewEl.current.textContent.slice(0, -3);
            overviewEl.current.textContent += '...';
        }
    }, [movie.overview])
    
    let overviewEl = useRef(null);
    let movieCore = useRef(null);
    let title = useRef(null);

    function toggleLinkFocused(focused) {
        toggleOverviewClamp();
        setLinkFocused(focused);
        movieCore.current.scrollTop = 0;

        handleMouseEvent(focused);
    }
    
    function toggleFavouriteMovie() {
        if (isFav(favourites, movie.id)) removeFromFavs(movie.id);
        else addToFavs(movie);
    }

    useEffect(() => {
        setCardStyle({paddingBottom: title.current.offsetHeight + 'px'});

        setDefaultStyle(defaultStyle => ({...defaultStyle, ...{top: `calc(100%  - ${title.current.offsetHeight}px)`}}));
        toggleOverviewClamp();

        setTransitionStyle(transitionStyle => ({...transitionStyle, ...{exiting: {top: `calc(100%  - ${title.current.offsetHeight}px)`}}, ...{exited: {top: `calc(100%  - ${title.current.offsetHeight}px)`}}}));
    }, [toggleOverviewClamp]);


    function handleMouseEvent(hovered) {
        toggleOverviewClamp();
        setInProp(hovered);
    }

    return (
        <div className="movie-card">

            <MovieRating rating={movie.vote_average}/>
            <MovieFavourite favourited={isFav(favourites, movie.id)} onClick={toggleFavouriteMovie}/>

            <div className={`movie-core-wrapper ${linkFocused ? 'focused' : ''}`}
                ref={movieCore}
                onMouseLeave={() => handleMouseEvent(false)} 
                onMouseEnter={() => handleMouseEvent(true)}
                style={cardStyle}
            >

                <img src={movie.poster_path != null ? moviePosterPath + movie.poster_path : genericMoviePoster} 
                    alt={`Movie poster of ${movie.title}`} />

                <Transition nodeRef={nodeRef} in={inProp} timeout={0}>
                    {state => (
                        <div className="details"
                        style={{...defaultStyle, ...transitionStyle[state]}}
                        >
                            
                            <p className="title" ref={title}>{movie.title}</p>
                            <p ref={overviewEl} className="overview" onTransitionEnd={() => toggleOverviewClamp()}>
                                {movie.overview ? movie.overview : 'No Description'}
                            </p>

                            <div className="bottom-details">
                                <p>{movie.release_date ? parseDate(movie.release_date) : 'Release unkown'}</p>
                                <Link to={`/movie/${movie.id}`} onFocus={() => toggleLinkFocused(true)} onBlur={() => toggleLinkFocused(false)}>More</Link>
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    )
}

export default MovieCard;