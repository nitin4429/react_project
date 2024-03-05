import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './pokemonDetails.css';

function PokemonDetails(){
    const {id} = useParams();
    const [pokemon,setPokemon] = useState({});
    async function downloads(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); 
        setPokemon({name: response.data.name,
        image:response.data.sprites.other.dream_world.front_default,
        weight:response.data.weight,
        height:response.data.height,
        })
    }
    useEffect(() =>{
        downloads();
    },[]);
    return(
        <>
       <div className="whole-pokemon">
       <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image} alt="nhi hua " />
            <div className="pokemon-details-name">{pokemon.name}</div>
            <div className="weight">Weight:{pokemon.weight}</div>
            <div className="height">Height:{pokemon.height}</div>
        </div>
       </div>
        </>
    )
}
export default PokemonDetails;