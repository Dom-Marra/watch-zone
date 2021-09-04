//Styling
import '../scss/components/Footer.scss';

//Images
import logo from '../images/logo.svg';

function Footer() {
    return(
        <footer>

            <div className="logo-container">
                <img src={logo} alt="Watch Zone logo" />
                <p>Watch Zone</p>
            </div>

            <p className="copy">&copy; Dominic Marra</p>
        </footer>
    )
}

export default Footer;