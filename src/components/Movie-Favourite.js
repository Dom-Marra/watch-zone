//Stlying
import '../scss/components/Movie-Favourite.scss';

import { Heart } from "react-feather";

function MovieFavourite({ favourited, onClick}) {

    return (
        <button aria-label={`Click to favourite`} 
            className={`favourite-btn heart toggle ${favourited ? 'fav' : ''}`}
            onClick={() => onClick()}
        >
            <Heart />
        </button>
    )
}

export default MovieFavourite;