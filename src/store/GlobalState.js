import React, {createContext, useReducer} from "react";
import AppReducer from './AppReducer';

function getFavouriteMovies() {
    let storedFavourites = localStorage.getItem('favouriteMovies');

    if (storedFavourites === null) return [];
    else return JSON.parse(storedFavourites);
}


const initialState = {
    favourites: getFavouriteMovies()
};

const GlobalContext = createContext(initialState);

function GlobalProvider({children}) {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addToFavs(movie) {
        dispatch({
            type: 'ADD_TO_FAVS',
            payload: movie
        });
    }

    function removeFromFavs(id) {
        dispatch({
            type: 'REMOVE_FROM_FAVS',
            payload: id
        });
    }

    return (
        <GlobalContext.Provider value={{
            favourites: state.favourites,
            addToFavs,
            removeFromFavs
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export {GlobalContext, GlobalProvider}