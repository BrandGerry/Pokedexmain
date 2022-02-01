//HOOKS
import React,{useState,useEffect} from 'react';
//REDUX
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
//AXIOS
import axios from "axios"
//ROUTERDOM
import { useNavigate } from 'react-router-dom';
//COMPONENTES
import PokeCard from "./PokeCard"
import "../Styles/Pokemons.styles.css"

const Pokemons = () => {
   const name = useSelector(state => state.name)
   const pokepage = useSelector(state => state.pokepage)

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [allPokemons, setAllPokemons] = useState([]);
   const [types, setTypes] = useState([]);
   const [oPokemon, setOPokemon] = useState("");
   const [page, setPage] = useState(1);

   //Api traidas y guardadas en un state
   useEffect(()=>{
    axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=300")
    .then(res => setAllPokemons(res.data.results))
   },[])

   useEffect(()=>{
    axios.get("https://pokeapi.co/api/v2/type")
    .then(res => setTypes(res.data.results))
   },[])

   //Funciones requeridas
   //Esta funcion guarda el tipo de valor obtenido en el select y lo pone en el store en api y me redirige a types
   const handleTypes = e =>{
       dispatch({
           type:"SET_API",
           payload:e.target.value
       })
       navigate("/types")
       setPage(1)
   }
   //Esta funcion me redirige a la pagina inicial (esta)
   const handleAll = () => {
    navigate("/pokemons")
    }
    //Buscar solo un pokemon
    const handleSearch = () =>{
        dispatch({
            type:"SET_ONLYPOKEMON",
            payload: oPokemon
        })
        navigate("/pokeSearch")
    }

    //PAGINACION pokepage=20 y el estado page=1
    const endIndex = page * pokepage;
    const startIndex = endIndex - pokepage;

    //Filtramos la cantidad de pokemones en el primer caso solo nos traeria 20
    const filterPokemons = allPokemons.slice(startIndex,endIndex)
    const totalPages = Math.ceil(allPokemons.length / pokepage)
    console.log(totalPages)


    const numberPages = []
    for (let i = 1; i <= totalPages; i++) {   
        numberPages.push(i)      
    }
    console.log(numberPages)

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
                        {
                            types.map(type =>
                            <option key={type.name} value={type.url}>{type.name}</option>)
                        }
                    </select>
                </label>
                <button onClick={handleAll} className='btn-all'>All</button>
            </div>

            <section className='container-search'>
                <h3>Whats your favorite pokemon?</h3>
                <label>
                    <div className='label-container'>
                        <input type="text" value={oPokemon} placeholder='Search Pokemon' onChange={e => setOPokemon(e.target.value) } />
                        <button onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </label>
            </section>
            <ul>
                {
                    filterPokemons.map(pokemon =>
                    <PokeCard 
                        key={pokemon.name} 
                        name={pokemon.name} 
                        url={pokemon.url}
                    />)
                }
            </ul>
            <section className='section-pages'>
                <p> Number of pokemons per page</p>
                <p> No. {pokepage}</p>

                <div className='section-btn'>
                  <button onClick={()=> handleChangePage(6)}>6</button>
                  <button onClick={()=> handleChangePage(12)}>12</button>
                  <button onClick={()=> handleChangePage(20)}>20</button>
                </div>

                
                <div className='container-pages'>
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

export default Pokemons;