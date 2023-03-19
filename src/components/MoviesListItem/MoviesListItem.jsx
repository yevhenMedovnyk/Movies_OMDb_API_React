import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import styles from "./MoviesListItem.module.scss";

import {addMovieToWant} from "../../features/moviesSlice";

const MoviesListItem = ({Title, Year, Poster, id}) => {
  const dispatch = useDispatch();
  const {search} = useSelector((state) => state.movies);
  const [inSearch, setInSearch] = useState(false);

  useEffect(() => {
    if (search?.some((item) => item.imdbID === id)) {
      setInSearch(true);
    }
  }, [search, id]);

  const addToWant = () => {
    dispatch(addMovieToWant({Title, Year, Poster, id}));
  };

  return (
    <li>
      <Link to={`/movie/${id}`} className={styles.wrapper}>
        <div className={styles.poster}>
          <img src={Poster} alt={Title} />
        </div>
        <p className={styles.title}>{Title}</p>
        <p className={styles.year}>{Year}</p>
      </Link>
    </li>
  );
};

export default MoviesListItem;
