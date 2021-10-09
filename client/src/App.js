import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
// import Formulario from './components/Formulario/Fomulario'
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={NavBar} /> 
      <Route exact path="/home" component={Home} />
      {/* <Route path="/" component={Formulario} /> */}
    </div>
  );
}

export default App;
