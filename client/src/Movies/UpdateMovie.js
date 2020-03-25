import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateMovie(props) {
    console.log("Update", props);
    let id = props.match.params.id;
    const [updateMovie, setUpdateMovie] = useState({
      id: Date.now(),
      title: "",
      director: "",
      metascore: "",
      stars: []
    });

    const handleChange = e => {
        e.preventDefault();
        setUpdateMovie({
          ...updateMovie,
          [e.target.name]: e.target.value
        });
      };
      const [starState, setStarState] = useState(false);
      const handleStar = e => {
        e.preventDefault();
        setUpdateMovie({ ...updateMovie, stars: updateMovie.stars.split(", ") });
        setStarState(true);
      };

      const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
          .then(res => {
            props.addToSavedList(res.data);
            props.history.push("/");
          })
          .catch(err => console.log(err));
      };
    
      useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => setUpdateMovie({ ...res.data, stars: res.data.stars.join(" ,") }))
          .catch(err => console.log(err));
      }, [id]);

      return (
        <form onSubmit={starState ? handleSubmit : handleStar}>
        <input
          name="title"
          type="text"
          value={updateMovie.title}
          onChange={handleChange}
        />
        <input
          name="director"
          type="text"
          value={updateMovie.director}
          onChange={handleChange}
        />
        <input
          name="metascore"
          type="text"
          value={updateMovie.metascore}
          onChange={handleChange}
        />
        <p></p>
        Stars:{" "}
        {starState ? (
          updateMovie.stars
        ) : (
          <input
            type="text"
            name="stars"
            value={updateMovie.stars}
            placeholder="Stars"
            onChange={handleChange}
          />
        )}
        <button type="submit">Save</button>
      </form>
    );
  }
  export default UpdateMovie;
