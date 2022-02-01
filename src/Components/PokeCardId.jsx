import React from 'react';
//ROUTER
import {useNavigate} from 'react-router-dom';

const PokeCardId = ({name, id, abilities, types, sprites}) => {
    const navigate = useNavigate();

    const typesElements = (types?.map((type, i) => <p key={i}> {type?.type?.name} </p>));
    const typeFirst = (types?.[0].type?.name);
    const getId = () => { navigate(`/pokemons/${id}`)}

    return (
        <li onClick={getId} 
        className={ typeFirst === "normal" ? "normal" 
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
        
           <section>
              <h5>#{id}</h5>
           </section>
  
           <section className="second-sect">
              <h2>{name}</h2>
              <p>Abilities: {abilities?.length}</p>
              <article className="container-type">
                 {typesElements}
              </article>
           </section>
           
           <section>
              <img src={sprites?.other?.dream_world?.front_default} alt={name} />
           </section>
        </li>
    );
}

export default PokeCardId;
