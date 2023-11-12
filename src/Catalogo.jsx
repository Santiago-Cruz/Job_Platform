
import React, { useEffect, useState } from 'react';
import { useBag } from './assets/contexts/BagContext';
import axios from 'axios';

function App() {
  const { bag, setBag } = useBag();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('SANTIAGO');
  const [page, setPage] = useState(1);
  const [adult, setAdult] = useState(false);
  const [language, setLanguage] = useState('es');

  const handleAddItem = () => {
    axios.post('http://localhost:3001/items', { query, language })
      .then(response => {
        console.log('Item added:', response.data);
        // You can update your state or perform any other actions here
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };


  const addToBag = (item) => {
    setBag([...bag, item]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=${adult}&language=${language}&page=${page}`;
      const options = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWJiNjA0MTlkNjcyNTFmM2NjMDZmZjA5MjIzZTU4ZiIsInN1YiI6IjY0ZmY4NTRlZGI0ZWQ2MTAzM2ExYTdhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VBCDlgbwd0J6xI5HLEhDaB1AgTl6OTUtfvMtEMJFW20',
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []); 
  return (
    <div>
      <button onClick={handleAddItem}> BOTON </button>
      {error ? (
        <p>Error: {error.message}</p>
      ) : Object.keys(data).length > 0 ? (

        <div>
          {console.log(data)}
          {Object.values(data).map((item, index) => (
            <div key={index}>Pelicula: {JSON.stringify(item)}
            <button onClick={() => addToBag(item)}> agregar </button>
            </div>

          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

