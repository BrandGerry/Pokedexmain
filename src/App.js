//Styles
import './App.css';
//Router
import {HashRouter,Routes,Route} from "react-router-dom"
//Componenets
import NameForm from "./Components/NameForm";
import Pokemons from "./Components/Pokemons"
import ProtectedRoutes from "./Components/ProtectedRoutes"
import PokeId from './Components/PokeId';
import PokeTypes from "./Components/PokeTypes"
import PokeSearchOne from "./Components/PokeSearchOne"


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<NameForm/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/pokemons" element={<Pokemons/>}/>
          <Route path="/pokemons/:id" element={<PokeId/>}/>
          <Route path="/types" element={<PokeTypes/>} />
          <Route path="/pokeSearch" element={<PokeSearchOne/>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
