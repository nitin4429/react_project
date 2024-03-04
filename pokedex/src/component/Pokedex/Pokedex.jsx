import Search from "../Search/Search";
import PokemonList from "../pokemonList/PokemonList";
import "./pokedex.css";
function Pokedex(){
 return(
    <div className="pokedex-wrapper">
       <h1>Pokedex</h1>
        <Search/>
        <PokemonList />
    </div>
 )
}
export default Pokedex;