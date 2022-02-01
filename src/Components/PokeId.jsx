//React
import React,{ useEffect , useState } from 'react';
//Axios
import axios from "axios";
//Router dom
import { useParams , useNavigate } from 'react-router-dom';
//STYLES
import "../Styles/PokeId.styles.css"

const PokeId = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const[pokeIdData,setPokeIdData] = useState("");

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res =>setPokeIdData(res.data))
    },[id])

    //Hacemos una funcion que el navigate se vaya para atras del historial con -1
    const back = () =>{
        navigate(-1)
    }

    //Dependiendo de su primer typo se le accedera a una clase y asu vez a un color
    const typeFirst = (pokeIdData?.types?.[0].type?.name);

    return (
        <div className='pokemonId-section'>
            <div className="first-section-id">
                <div className="first-section-cont">
                    <div className="container-back">
                        <i onClick={back}>Back</i>
                    </div>
                    <div className="info-cont">
                        <img src={pokeIdData.sprites?.other?.dream_world?.front_default} alt={pokeIdData.name} className='img-pokemin'/>
                        <div className='info'>
                            <h2>{pokeIdData.name}</h2>
                            <h3>#{id}</h3>
                        </div>
                    </div>
            </div>
            <div className="second-section-cont">
                <article className={`second-section-id ${typeFirst === "normal" ? "normal" 
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
                : typeFirst === "fairy" ? "fairy"
                : null}`} > 
                    <div className="container-first-second">
                        <article className='first-article'>
                            <section className='description'>
                                <div className='abilities'>
                                    <h3>Abilities:</h3>
                                    {
                                        pokeIdData?.abilities?.map((abilitie, i) => <p key={i}>{abilitie?.ability?.name}</p>)
                                    }
                                </div>
                                <div className='sizeone'>
                                    <h3>Size: </h3>
                                    <p>Height: {pokeIdData.height}</p> 
                                    <p>Weight: {pokeIdData.weight}</p>
                                </div> 
                            </section>
                            <section className='moves'>
                                <h3>Moves: </h3>
                                {
                                    pokeIdData?.moves?.slice(0, 10).map((move, i) => <p key={i}>{move?.move?.name}</p>)
                                }
                            </section>
                        </article>
                        <article className='second-article'>
                            <h3 className='stats'>Stats</h3>
                            {
                                pokeIdData?.stats?.map(stat => (
                                    <div key={stat?.stat?.name} className='porcent'>
                                        <h4>{stat?.stat?.name}:</h4>
                                        <p >
                                            {stat?.base_stat}% 
                                        </p>
                                    </div>
                                    
                                    ))
                            }
                        </article>
                    </div>

                    <article className='third-article'>
                        <h3>Types: </h3>
                        <div className='types-container'>
                        {pokeIdData?.types?.map((type, i) => <p key={i}>{type?.type?.name}</p>)}   
                        </div>
                    </article>
                </article>
            </div>
            </div>
        </div>
    )
};

export default PokeId;