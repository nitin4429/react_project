import './pokemon.css';
function Pokemon({name,image}){
    return(
       <>
       <div className="pokemon-image">
            <div className='pokemon-name'>
                {name}
            </div>
            <div>
                <img className='images' src={image}/>
            </div>
       </div>
       </>
    )
}
export default Pokemon;