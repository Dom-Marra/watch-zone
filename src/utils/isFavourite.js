/**
 * Checks an array and return whether the movie id provided is matched within it
 * 
 * @param {Array} favourites 
 *          array of favourites to check
 * @param {string} id 
 *          id of the movie
 * @returns 
 */
export default function isFav(favourites, id) {
    let found = favourites?.find(movie => movie.id === id);

    return found != null;
}