import React, { useState, useEffect } from 'react';
import '../styles/index.css';

import Giphy from './Giphy';
import SearchBar from './SearchBar';

export default function App() {
  const [gifSearch, setGifSearch] = useState({});
  const [loading, setLoading] = useState(false);

  const key = '4zczkjsWs8I2SzNTBNYMhqP0QY76uei1';

  const requestApi = async () => {
    const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${key}`;
    try {
      setLoading(true)
      const res = await fetch(endpoint);
      const json = await res.json();
      console.log('makeApiCall', json.data);
      setGifSearch({ image_url: json.data.images.downsized_large.url });
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    requestApi();
  }, []);

  const handleSubmit = async (value) => {
    if(value) {
      const gifSearch = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${value}&limit=1`;
      const res = await fetch(gifSearch);
      const json = await res.json();
      console.log('handleSumbit', json.data[0].images.downsized_large.url );
      setGifSearch({ image_url: json.data[0].images.downsized_large.url });
    } else {
      makeApiCall()
    }
  };

  const gifMessage = gifSearch.image_url ? ( <Giphy gifSearch={gifSearch} />) : (<h2>Random</h2>)

  return (
    <div className="App">
      <h1 style={{color: "blue"}}>Dennelle's Giphy Page</h1>
      <SearchBar handleSubmit={handleSubmit} />
      {gifMessage}
    </div>
  );
}
