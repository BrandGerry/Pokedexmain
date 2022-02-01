//React
import React,{useEffect,useState} from 'react';
//REDUX
import { useSelector, useDispatch } from 'react-redux';
//Axios
import axios from "axios"
//ROUTER
import { useNavigate } from 'react-router-dom';
//Cmponentes
import PokeCardId from "./PokeCardId"
//Styles
import"../Styles/PokeSearchOne.styles.css"

const PokeSearchOne = () => {
    const aSearch = useSelector(state => state.onlypokemon)
    const name = useSelector(state => state.name)

    const [poke, setPoke] = useState([]);
    const [types, setTypes] = useState([]);
    const [oPokemon, setOPokemon] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type')
    .then(res => setTypes(res.data.results))
    }, [])

    //En este useEffect le vamos a pasar el pokemon de la store de redux
    useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${aSearch}`)
    .then(res => setPoke(res.data))
    }, [aSearch])

    //Funciones
    const handleTypes = (e) =>{
        dispatch({
           type: "SET_API",
           payload: e.target.value})
           navigate("/types")
    }
    
    const handleAll = () => {
        navigate("/pokemons")
    }
  
    const handleSearch = () => {
        dispatch({
            type: "SET_ONLYPOKEMON",
            payload: oPokemon
        })
        navigate("/pokeSearch")
    }

    return (
        <div className='container-pokedexuno'>
            <header>
                <p>Welcome {name}!</p>
                <p>You can find all the pokemons</p>
            </header>

            <div className='container-select'>
                <label>
                <select name="types" id="types" onChange={e => handleTypes(e)}>
                    <option>Types</option>
                    {types.map(type => 
                        <option key={type.name} value={type.url} > 
                            {type.name}
                        </option>
                        )}
                </select>
                </label>
                <button onClick={handleAll} className='btn-all'>All</button>
            </div>


            <section className="container-search">
                <p>Write the name of your favorite pokemon</p>
                <label>
                <div>
                    <input type="text" value={oPokemon} placeholder='Search Pokemon...'
                            onChange={e => setOPokemon(e.target.value) } />
                    <button onClick={handleSearch} >
                        <i>Buscar</i>
                    </button>
                </div>
                </label>

            </section>
         
            <section>
                <ul>
                {
                    <PokeCardId 
                        key={poke.name} 
                        name={poke.name}
                        id={poke.id}
                        abilities={poke.abilities}
                        types={poke.types}
                        sprites={poke.sprites} 
                    />
                } 
                </ul>
            </section>
         
      </div>
    );
};

export default PokeSearchOne;