//HOOKS
import React,{useState,useEffect} from 'react';
//Axios
import axios from "axios";
//Routerdom
import { useNavigate } from 'react-router-dom';
//Styles
import "../Styles/PokeCard.styles.css"

const PokeCard = ({name,url}) => {

    const[pokemonData,setPokemonData] = useState([])
    console.log(pokemonData)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(url)
        .then(res => setPokemonData(res.data))
    }, [url])

    //Constantes para los elementos 
    const typesElements = (pokemonData?.types?.map((type, i) => <p key={i}> {type?.type?.name} </p>));
    const typeFirst = (pokemonData?.types?.[0].type?.name);
    const getId = () => { navigate(`/pokemons/${pokemonData.id}`)}

    return (
        <li onClick={getId} className={ typeFirst === "normal" ? "normal" 
         : typeFirst === "grass" ? "grass" 
         : typeFirst === "fighting" ? "fighting"
         : typeFirst === "poison" ? "poison"
         : typeFirst === "ground" ? "ground"
         : typeFirst === "rock" ? "rock"
         : typeFirst === "bug" ? "bug"
         : typeFirst === "ghost" ? "ghost"
         : typeFirst === "steel" ? "steel"
         : typeFirst === "fire" ? "fire"
         : typeFirst === "water" ? "water"
         : typeFirst === "electric" ? "electric"
         : typeFirst === "psychic" ? "psychic"
         : typeFirst === "ice" ? "ice"
         : typeFirst === "dragon" ? "dragon"
         : typeFirst === "dark" ? "dark"
         : typeFirst === "fairy" ? "fairy": null}>

             <section className='first-sect'>
                 <h4>#{pokemonData.id}</h4>
             </section>

             <section className='second-sect'>
                 <h2>{name}</h2>
                 <p>Abilities: {pokemonData?.abilities?.length}</p>
                 <div className='size'>
                     <p>Height: {pokemonData?.height}</p>
                     <p>Weight: {pokemonData?.weight}</p>
                 </div>
                 <article className='container-type'>
                   {typesElements}
                 </article>
             </section>
             <section className='third-sect'>
                <img src={pokemonData.sprites?.other?.dream_world?.front_default} height="100px"alt={name} />
             </section>

        </li>
        

        
    );
};

export default PokeCard;
