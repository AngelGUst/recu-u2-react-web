import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

//(https://pokeapi.co/api/v2/pokemon?limit=10&offset=0)
//( https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png)
function App() {
  const[pokemon, setPokemon] = useState([]);
  const[offset, setOffset]= useState(0);
  const[error, setError] = useState();

  useEffect(() =>{
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
          .then((response) =>{
            setPokemon(response.data.results)
          })
          .catch((error) =>{
            setError(error.message)
          })
  },[offset])

  const adelante =() =>{
    setOffset(offset + 10);
  }

  const atras = () =>{
    if (offset >= 10) {
      setOffset(offset - 10)
    }
  }

  return (
    <div>
      <h1>Lista de pokemones</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {pokemon.map((pokemon, index) => (
            <li key={pokemon.name}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={atras}>Atras</button>
      <button onClick={adelante}>Adelante</button>
    </div>
  )
}

export default App
