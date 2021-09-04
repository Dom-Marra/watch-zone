//Styling
import '../scss/components/Nav-Bar.scss';

//React and React Router Imports
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

//Icons & Images Imports
import logo from '../images/logo.svg';
import { Menu, X } from 'react-feather';

function NavBar () {

    const [navState, setNavState] = useState('');
    let mediaQuery = useRef(window.matchMedia('(min-width: 38rem)'));

    mediaQuery.current.addEventListener('change', () => {
        if (mediaQuery.current.matches) setNavState('');
    });

    function toggleNavState(state) {
        if (!mediaQuery.current.matches) setNavState(state)
    }

    return (
        <header className="top-header">

            <button aria-label="Open Menu" className="menu-toggle open" onClick={() => toggleNavState('opened')}><Menu /></button>
            <NavLink to="/" exact className="logo-wrapper">
                <img src={logo} alt="logo" />
                <h1>Watch Zone</h1>
            </NavLink>
            
            
            <nav className={`navigation ${navState}`}>
                <button aria-label="Close Menu" className="menu-toggle" onClick={() => toggleNavState('closed')}><X /></button>
                <ul className="links">
                    <li className="link"><NavLink to="/" activeClassName="active" exact onClick={() => toggleNavState('closed')}>Home</NavLink></li>
                    <li className="link"><NavLink to="/favourites" activeClassName="active" onClick={() => toggleNavState('closed')}>Favourites</NavLink></li>
                    <li className="link"><NavLink to="/about" activeClassName="active" onClick={() => toggleNavState('closed')}>About</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;