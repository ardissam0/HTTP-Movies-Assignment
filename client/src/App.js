import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  //added route for updatemovie
  //changed move to take props
  return (
    <>
      <SavedList style={{textDecoration: 'none',}} list={savedList} />

      <Route exact path="/">
        <MovieList style={{textDecoration: 'none',}} movies={movieList} />
      </Route>

      <Route path="/movies/:id"
        render={props => <Movie style={{textDecoration: 'none',}} addToSavedList={addToSavedList} {...props} />} />

      <Route exact path='/update-movie/:id' 
      render={props => <UpdateMovie style={{textDecoration: 'none',}} {...props} addToSavedList={addToSavedList} />}
      />
    </>
  );
};

export default App;
