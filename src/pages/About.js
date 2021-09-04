//Styling
import '../scss/pages/About.scss';

//Icons & Images
import { Heart } from 'react-feather';
import tmdbLogo from '../images/tmdb-logo.svg';

function About() {
    return (
        <section className="about-section">
            <h2>About Watch Zone</h2>

            <p className="overview">
                Welcome to the Watch Zone! Watch Zone is a movie database website that utilizes the TMDB API to 
                display movies filtered by the most popular, top rated, upcoming and now playing. If you find a 
                movie you like or would like to watch you can favourite them to save them.
            </p>

            <article>
                <h3>How To Use It</h3>

                <ol>
                    <li>
                        Visit the Home page and browse the list of movies. You can
                        also filter the list using the dropdown to select categories 
                        and/or using the search bar to browse by title.
                    </li>
                    <li>
                        When you come across a movie that you might like you can
                        hover on it to gain a breif overview. If you want to read
                        more you can click on it to be redirected to detailed page.
                    </li>
                    <li>
                        If you come accros a movie you want to remember to watch
                        you can click on the <span className="icon heart"> <Heart /> </span> icon to save it. Then within the 
                        favourites page you’ll see the movie you just saved!
                    </li>
                </ol>
            </article>

            <figure>
                <figcaption>
                    Watch Zone uses the TMDb API but is not endorsed or certified by TMDb.
                </figcaption>
                <img src={tmdbLogo} alt="" />
            </figure>


        </section>
    )
}

export default About;