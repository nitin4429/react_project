import { useEffect, useState } from "react";
import Pokemon from '../pokemon/pokemon.jsx';
import axios from 'axios';
import './pokemonList.css';
function PokemonList(){
    const [pokemonList,setpokemonList] = useState([]);
    const [loading,setloading] = useState(true);
    const [pokedexurl,setpokedexurl] = useState("https://pokeapi.co/api/v2/pokemon");
    const[nexturl,setnexturl] = useState('');
    const[prevurl,setprevurl] = useState('');
    async function downloadpokemon(){
        setloading(true);
        const response = await axios.get(pokedexurl);
        const pokemonResult = response.data.results;
        console.log(response.data);
        setnexturl(response.data.next);
        setprevurl(response.data.previous);
        const pokemonListPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonListPromise);
        console.log(pokemonData);
        const res = pokemonData.map((pokedata) =>{
            const pokemon = pokedata.data;
            return{
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default :  pokemon.sprites.other.back_shiny,
                types: pokemon.types
            }    
        });
        console.log(res);
        setpokemonList(res);
        setloading(false);
    }
    useEffect(() =>{
        downloadpokemon();
    },[pokedexurl]);
    return(
        <div className="pokemon-list-wrapper">
           <h2 className="heading">Pokemon List</h2>
            <div className="pokemon-wrapper">
            {(loading)?'Loading...': pokemonList.map((p) =><Pokemon name={p.name} image={p.image} key={p.id}/>)}
            </div>
            <div className="controls">
            <button disabled={prevurl==null} onClick={() =>{setpokedexurl(prevurl)}}>Prev</button>
            <button disabled={nexturl==null} onClick={() =>{setpokedexurl(nexturl)}}>Next</button>
            </div>
        </div>
        )
}
export default PokemonList;