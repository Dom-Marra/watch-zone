//Styling
import '../scss/components/App.scss';

//React Imports
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalProvider } from '../store/GlobalState';

//Components
import NavBar from '../components/Nav-Bar';
import Footer from '../components/Footer';

//Pages
import Home from '../pages/Home';
import Favourites from '../pages/Favourites';
import About from '../pages/About';
import SingleMovie from '../pages/Single-Movie';

//Globals
import { APP_FOLDER_NAME } from '../globals/globals';

function App() {
  return (
    <Router basename={ APP_FOLDER_NAME }>
      <GlobalProvider>
        <NavBar />
        <main>
          <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/favourites"><Favourites /></Route>
            <Route path="/about" ><About /></Route>
            <Route path="/movie/:id"><SingleMovie /></Route>
          </Switch>
        </main>
        <Footer />
      </GlobalProvider>
    </ Router>
  );
}

export default App;
