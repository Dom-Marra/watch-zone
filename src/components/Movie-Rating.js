//Stling
import '../scss/components/Movie-Rating.scss';

function MovieRating({ rating }) {

    return (
        <svg className="movie-rating" viewBox="0 0 100 100">
            <circle 
                cx="50" 
                cy="50" 
                r="46" 
                className="bg"
                strokeDasharray="289%"
                strokeDashoffset={`${289 * rating / 10}%`}
            />
            <circle 
                cx="50" 
                cy="50" 
                r="46" 
                className="progress" 
                strokeDasharray="289%"
                strokeDashoffset={`${289 * (10 - rating) / 10}%`}
            />
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{(rating * 10).toPrecision(3) + "%"}</text>
        </svg>
    )
}

export default MovieRating;