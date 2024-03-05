import { Route, Routes } from "react-router-dom";
import Pokedex from "../component/Pokedex/Pokedex";
import PokemonDetails from "../component/PokemonDetails/pokemonDetails";

function CustomRoutes(){
   return(
    <Routes>
        <Route path="/" element={<Pokedex/>}/>
        <Route path="/pokedex/:id" element={<PokemonDetails/>}/>
    </Routes>
   )
}
export default CustomRoutes;