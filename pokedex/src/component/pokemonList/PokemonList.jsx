import { useEffect, useState } from "react";
import Pokemon from '../pokemon/pokemon.jsx';
import axios from 'axios';
import './pokemonList.css';
function PokemonList(){
    // const [pokemonList,setpokemonList] = useState([]);
    // const [loading,setloading] = useState(true);
    // const [pokedexurl,setpokedexurl] = useState("https://pokeapi.co/api/v2/pokemon");
    // const[nexturl,setnexturl] = useState('');
    // const[prevurl,setprevurl] = useState('');
    const [pokedexListState,setpokedexListState] = useState({
        pokemonList:[],
        loading:true,
        pokedexurl:"https://pokeapi.co/api/v2/pokemon",
        nexturl:'',
        prevurl:'',
    });
    async function downloadpokemon(){
        // setloading(true);
        setpokedexListState((state) => ({...state,loading:true}));
        const response = await axios.get(pokedexListState.pokedexurl);//This download list of 20 pokemons
        const pokemonResult = response.data.results;//we get the array of pokemon from results
        console.log(response.data);
        // setnexturl(response.data.next);
        // setprevurl(response.data.previous);
        setpokedexListState((state) => ({...state,nexturl:response.data.next,prevurl:response.data.previous}));

        //iterating over the array of pokemon,and using their url , to create an array of promises
        //that will download those 20 pokemons
        const pokemonListPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

        //passing the promises array in axios.all
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
        // setpokemonList(res);
        setpokedexListState((state) =>({...state,pokemonList:res , loading:false}));
        // setloading(false);
       
    }
    useEffect(() =>{
        downloadpokemon();
    },[pokedexListState.pokedexurl]);
    return(
        <div className="pokemon-list-wrapper">
           <h2 className="heading">Pokemon List</h2>
            <div className="pokemon-wrapper">
            {(pokedexListState.loading)?'Loading...': pokedexListState.pokemonList.map((p) =><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
            </div>
            <div className="controls">
            <button disabled={pokedexListState.prevurl==null} onClick={() =>{
                const urlToSet = pokedexListState.prevurl;
                setpokedexListState({...pokedexListState,pokedexurl: urlToSet})
                }}>Prev</button>
            <button disabled={pokedexListState.nexturl==null} onClick={() =>{
                const urlToSet = pokedexListState.nexturl;
                setpokedexListState({...pokedexListState,pokedexurl: urlToSet})
                }}>Next</button>
            </div>
        </div>
        )
}
export default PokemonList;