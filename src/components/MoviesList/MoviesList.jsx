import React from "react";
import MoviesListItem from "../MoviesListItem/MoviesListItem";
import styles from "./MoviesList.module.scss";

const MoviesList = ({movies}) => {
  return (
    <ul className={[styles.wrapper, movies?.length > 0 ? styles.bg : ''].join(" ")}>
      {movies?.map((movie) => (
        <MoviesListItem
          key={movie.imdbID}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
          id={movie.imdbID}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
