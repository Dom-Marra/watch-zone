//Styling
import '../scss/pages/Home.scss';

//React Imports
import { useEffect, useState } from 'react';

//Globals
import { API_FETCH, API_TOKEN, API_SEARCH, API_IMG } from "../globals/globals";

//Components
import MovieCard from "../components/Movie-Card"
import Input from '../components/Input';
import DropDown from '../components/Drop-Down';
import Loader from '../components/loader';

//Icons
import { Search } from 'react-feather';

function Home () {
    const DROP_DOWN_VALUES = ["Popular", "Top Rated", "Upcoming", "Now Playing"];
    const [sort, setSort] = useState('popular');
    const [movieData, setMovieData] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [maxPages, setMaxPages] = useState(1);

    useEffect(() => {
        fetchMovies();
    }, [sort, page, search]);

    async function fetchMovies() {

        setLoading(true);

        let fetchUrl;
    
        if (!search) fetchUrl = `${API_FETCH + sort}?language=en-US&page=${page}`;
        else fetchUrl = `${API_SEARCH}?query=${search}&page=${page}`; 

        const res = await fetch(fetchUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + API_TOKEN
            }
        });

        const responseData = await res.json();

        setMaxPages(responseData.total_pages);

        console.log(responseData);

        Promise.all(preloadMoviePosters(responseData.results)).then(() => {
            setLoading(false);
            setMovieData([...movieData, ...responseData.results]);
        });
    }

    function preloadMoviePosters(movies) {
        const imagePreloads = [];

        movies?.forEach(movie => {

            if (movie.poster_path) {
                const moviePoster = new Image();

                moviePoster.src = API_IMG + 'w342' + movie.poster_path;

                imagePreloads.push(new Promise(resolve => {
                    moviePoster.onload = () => {
                        resolve();
                    }
                }));
            }
        });

        return imagePreloads;
    }

    function handleSortInput(val) {
        const sortValues = ['popular', 'top_rated', 'upcoming', 'now_playing'];
        const selectValIndex = DROP_DOWN_VALUES.findIndex(sort => sort === val);

        if (!search && sortValues[selectValIndex] !== sort) {
            setPage(1);
            setMovieData([]);
            setSort(sortValues[selectValIndex]);
        }
    }

    function handleSearchInput(val) {
        let searchString = val.trim();
        
        if (searchString) {
            setPage(1);
            setMovieData([]);
            setSearch(val);
        } else if (searchString !== search) {
            setPage(1);
            setMovieData([]);
            setSearch('');
        }
    }

    return (
        <section className="home-section">
            
            <div className="inputs-wrapper">
                <div className="inputs">
                    <Input label="Search" 
                        id="movie-search" 
                        icon={ <Search /> } 
                        onChange={handleSearchInput}
                    />
                    <DropDown label="Sort" 
                        id="movie-sort" 
                        values={DROP_DOWN_VALUES} 
                        onChange={handleSortInput}
                        disabled={search}
                    />
                </div>
            </div>

            {
                search && 
                <h2 className="search-text">Searching for <span className="highlighted-text">{search}</span></h2>
            }

            
            <div className="movies-wrapper">
                {
                    movieData?.map((movie, i) => 
                        <MovieCard 
                            movie={movie}
                            key={i}
                        />
                    )
                }
            </div>
            
            {
                loading ? <Loader></Loader> :
                maxPages !== page && <button className="load-more" onClick={() => {setPage(page + 1)}}>Load More</button>
            }
        </section>
    )
}

export default Home;