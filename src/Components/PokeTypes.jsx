//REACT
import React, {useState, useEffect}from 'react';
//REDUX
import { useSelector , useDispatch } from 'react-redux';
//AXIOS
import axios from 'axios';
//ROUTER
import {useNavigate} from 'react-router-dom';
//Componentes
import PokeCard from './PokeCard';

const PokeTypes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useSelector(state => state.name)
    const pokepage = useSelector(state => state.pokepage)
    const api = useSelector(state => state.api)

    const [types, setTypes] = useState([]);
    const [oPokemon, setOPokemon] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type')
        .then(res => setTypes(res.data.results))
    }, [])

    useEffect(() => {
        axios.get(api)
        .then(res => setPokemons(res.data.pokemon))
    }, [api])


    const handleTypes = (e) =>{
    dispatch({
        type: "SET_API",
        payload: e.target.value})
        navigate("/types")
        setPage(1)
    }
    const handleAll = () => {
        navigate("/pokemons")
    }

    const endIndex = page * pokepage;
    const startIndex = endIndex - pokepage;
    const filterPokemons = pokemons.slice(startIndex, endIndex)
    const totalPages = Math.ceil(pokemons.length/pokepage)

    const numberPages = [];
    for (let i = 1; i <= totalPages; i++) {   
        numberPages.push(i)      
    }

    const handleSearch = () => {
        dispatch({
            type: "SET_ONLYPOKEMON",
            payload: oPokemon
        })
        navigate("/pokeSearch")
    }
    const handleChangePage = (num) =>{
        dispatch({
        type: "SET_POKEPAGE",
        payload: num
        })
        setPage(1)
    }
      
  return (
      <div className='container-pokedex'>
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
               <div className='label-container'>
                  <input type="text" value={oPokemon} placeholder='Search Pokemon...'
                        onChange={e => setOPokemon(e.target.value) } />
                  <button onClick={handleSearch} >
                     Buscar
                  </button>
               </div>
            </label>
         </section>
        
         <ul>
           {
              filterPokemons.map(pokemon => <PokeCard
                                       key={pokemon.pokemon.name} 
                                       name={pokemon.pokemon.name}
                                       url={pokemon.pokemon.url} />)
           } 
         </ul>

          <section>
                   <p> Choose the number of pokemons per page</p>
                <p> No. {pokepage}</p>

             
              <div>
                  <button onClick={()=> handleChangePage(6)}>6</button>
                  <button onClick={()=> handleChangePage(12)}>12</button>
                  <button onClick={()=> handleChangePage(20)}>20</button>
              </div>
              
              <div>
                  {
                     numberPages.map(number => 
                        <button key={number} onClick={() => setPage(number)}>
                           {number}
                        </button>)
                  } 
              </div>
           </section>
           
   </div>
   );
};

export default PokeTypes;
