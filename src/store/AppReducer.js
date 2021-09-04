function AppReducer(state, action) {
    switch(action.type) {
        case 'ADD_TO_FAVS': {
            const newFavourites = [...state.favourites, action.payload];

            const newStoredFavourites = JSON.stringify(newFavourites);
            localStorage.setItem('favouriteMovies', newStoredFavourites);

            return {
                ...state,
                favourites: newFavourites
            }
        }
        case 'REMOVE_FROM_FAVS': {
            let currentFavourites = state.favourites;
        
            const movieToRemove = currentFavourites.findIndex(currMovie => currMovie.id === action.payload);
            if (movieToRemove === -1) return state;

            currentFavourites.splice(movieToRemove, 1);

            const newStoredFavourites = JSON.stringify(currentFavourites);
            localStorage.setItem('favouriteMovies', newStoredFavourites);

            return {
                ...state,
                favourites: currentFavourites
            }
        }
        default:
            return state;
    }
}

export default AppReducer;