import { Link } from 'react-router-dom';
import './pokemon.css';
function Pokemon({name,image , id}){
    return(
       <>
       <div className="pokemon-image">
       <Link to ={`/pokedex/${id}`}>
           <div className='pokemon-name'>
                {name}
            </div>
            <div>
                <img className='images' src={image}/>
            </div>
        </Link>
       </div>
       </>
    )
}
export default Pokemon;