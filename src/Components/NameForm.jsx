//HOOKS
import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//IMG
import EntrenadorPokemon from "../Imagenes/Entrenadorpokemon.png"
//STYLES
import "../Styles/NameForm.styles.css"


const NameForm = () => {
    //Hooks y mas
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[name,setName] = useState("");

    const submit = (e) =>{
        e.preventDefault()
        dispatch({
            type:
            "SET_NAME",
            payload: name})
            navigate("/Pokemons") 
    } 
    

    return (
        <div className='Login_welcome'>
            <div className='first_section'>
                <div className='first_text'>
                    <h1>Pokedex</h1>
                </div>
               
                <div className='second_section'>
                    <div className='second_text'>
                        <h2>Hello! Trainer</h2>
                        <p>Are you ready?</p>
                    </div>
                    <img src={EntrenadorPokemon}  height="300px" alt="Entrenador"/>
                </div>
            </div>

            <section className='third_section'>
                <form onSubmit={submit} className='container_input'>
                    <label htmlFor="label_first">
                        <h3>Write your name</h3>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                    </label>
                    <button>Go</button>
                </form>
            </section>
        </div>
        
    );
};

export default NameForm;
