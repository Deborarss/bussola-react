import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data/cities.json'

function App() {

  const [searchCity, setSearchCity] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const modal = true
  const cidades = []

  const handleChange = e => {
    setSearchCity(e.target.value)
  }

  const getCities = () => {
    
    data.estados.map((estados) => (
      estados.cidades.map(x => (
        cidades.push(x)
      ))
    ))
    
  }

  useEffect(() => {
    getCities()
    const results = cidades.filter(city => 
      city.toLowerCase().includes(searchCity.toLocaleLowerCase())
    )
    setSearchResults(results)
  }, [searchCity])

  return (
    <div className="App">
      <input 
        type="text"
        placeholder="Informe a sua cidade"   
        value={searchCity}    
        onChange={handleChange}
      />
      {modal && searchCity !== '' &&
      <ul>
        {searchResults.map((city, i) => (
          <li key={i}>{city}</li>
        ))}      
      </ul>
      }
    </div>
  );
}

export default App;
