import React, { useState, useEffect } from 'react';
import data from '../../data/cities.json';

import { Location, Container, Lista } from './styles';

function Search() {
  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modal, setModal] = useState(true);
  const [local, setLocal] = useState('');
  // const modal = true;
  const cidades = [];

  const handleChange = e => {
    setSearchCity(e.target.value);
  };

  const getCities = () => {
    data.estados.map(estados => estados.cidades.map(x => cidades.push(x)));
  };

  const setCity = city => {
    setSearchCity(city);
    setModal(false);
    localStorage.setItem('cidade', city);
  };

  useEffect(() => {
    getCities();
    const local = localStorage.getItem('cidade');
    setLocal(local);
    const results = cidades.filter(city =>
      city.toLowerCase().includes(searchCity.toLocaleLowerCase())
    );
    setSearchResults(results);
  }, [searchCity]);

  return (
    <Container>
      <Location>{local ? local : 'Qual a sua localização?'}</Location>
      <input
        type="text"
        placeholder="Informe a sua cidade"
        value={searchCity}
        onChange={handleChange}
      />
      {modal && searchCity !== '' && (
        <Lista>
          {searchResults.map((city, i) => (
            <li key={i} onClick={() => setCity(city)}>
              {city}
            </li>
          ))}
        </Lista>
      )}
    </Container>
  );
}

export default Search;
