import React, { useState, useEffect } from 'react';
import '../styles/index.css';

import Giphy from './Giphy';
import SearchBar from './SearchBar';

export default function App() {
  const [gifSearch, setGifSearch] = useState({});
  const [loading, setLoading] = useState(false);

  const key = '4zczkjsWs8I2SzNTBNYMhqP0QY76uei1';

  const requestApi = async () => {
    //getting the API
    const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${key}`;
    try {
      setLoading(true)
      const res = await fetch(endpoint);
      //confirms that gif was fetched.
      console.log("Response for Endpoint",res);
      //receiving the data from json and console.log to determine the shape of the data.
      const json = await res.json();
      console.log("JSON",json);
      //the data is an object with two keys data and meta. Using data I obtained the image I need and the url.
      setGifSearch({ image_url: json.data.images.downsized.url });
    } catch (err) {
      console.log('err', err);
    }
  };
  //this the state after it was updated and I use this object:string in the giphy component to render it on the page.
  console.log('GIF SEARCH', gifSearch)

  useEffect(() => {
    requestApi();
  }, []);

  const handleSubmit = async (value) => {
    if(value) {
      const gifSearch = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${value}&limit=1`;
      const res = await fetch(gifSearch);
      const json = await res.json();
      console.log('handleSumbit', json.data[0].images.downsized_still );
      //image_url is a from the gifSearch state. see Giphy component
      setGifSearch({ image_url: json.data[0].images.downsized_still });
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
