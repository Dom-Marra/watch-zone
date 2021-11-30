//Styling
import '../scss/pages/Home.scss';

//React Imports
import {  useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import qs from 'query-string';

//Globals
import { API_FETCH, API_TOKEN, API_SEARCH, API_IMG } from "../globals/globals";

//Components
import MovieCard from "../components/Movie-Card"
import Input from '../components/Input';
import DropDown from '../components/Drop-Down';
import Loader from '../components/loader';
import Pagination from '../components/Pagination';

//Icons
import { Search } from 'react-feather';

function Home () {
    const DROP_DOWN_VALUES = ["Popular", "Top Rated", "Upcoming", "Now Playing"];
    const history = useHistory();
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxPages, setMaxPages] = useState(1);
    const [search, setSearch] = useState(qs.parse(history.location.search).search);

    useEffect(() => {
        async function fetchMovies () {
            const { search, sort, page } = qs.parse(history.location.search);
            let fetchUrl;
    
            setLoading(true);
            setMovieData([]);
    
            if (!search) fetchUrl = `${API_FETCH + (sort ? sort : 'popular')}?language=en-US&page=${page ? page : 1}`;
            else fetchUrl = `${API_SEARCH}?query=${search}&page=${page ? page : 1}`; 
    
            const res = await fetch(fetchUrl, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_TOKEN
                }
            });
    
            const responseData = await res.json();
    
            setMaxPages(responseData.total_pages);
    
            Promise.all(preloadMoviePosters(responseData.results)).then(() => {
                setLoading(false);
                setMovieData(responseData.results);
            });
        }

        fetchMovies();

    }, [history.location.search]);

    function handleSearchInput(cleared = false) {
        const qSearch = qs.parse(history.location.search).search;
        const cleanedSearch = search?.trim();

        if (cleanedSearch === qSearch && !cleared) {
            return;
        } else if (cleared || (!cleanedSearch && qSearch)) {
            history.push({});
        } else if (cleanedSearch) {
            history.push({
                pathName: '/',
                search: `?search=${cleanedSearch}&page=${1}`
            });
        }
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
        const { search, sort } = qs.parse(history.location.search);

        if (!search && sortValues[selectValIndex] !== sort) {
            history.push({
                pathName: '/',
                search: `?sort=${sortValues[selectValIndex]}&page=${1}`
            });
        }
    }

    function handleNewPage(newPage) {
        const params = qs.parse(history.location.search);
        const newParams = {...params, page: newPage}

        history.push({
            pathname: '/',
            search: qs.stringify(newParams)
        });
    }

    return (
        <section className="home-section">
            
            <div className="inputs-wrapper">
                <div className="inputs">
                    <Input label="Search" 
                        id="movie-search" 
                        icon={ <Search /> } 
                        onInput={setSearch}
                        onChange={(e) => handleSearchInput()}
                        value={search}
                    />
                    <DropDown label="Sort" 
                        id="movie-sort" 
                        values={DROP_DOWN_VALUES} 
                        onChange={handleSortInput}
                        disabled={qs.parse(history.location.search).search}
                    />
                </div>
            </div>

            {
                qs.parse(history.location.search).search && (
                    <>
                        <h2 className="search-text">Searching for <span className="highlighted-text">{qs.parse(history.location.search).search}</span></h2>
                        <button className="clear-search" onClick={() => { setSearch(); handleSearchInput(true); }}>Clear search</button>
                    </>
                )
                
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
                <Pagination 
                    pages={maxPages} 
                    currentPage={qs.parse(history.location.search).page ? parseInt((qs.parse(history.location.search).page)) : 1} 
                    onChange={handleNewPage} 
                />
            }
        </section>
    )
}

export default withRouter(Home);