import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./MovieDetails.module.scss";

import {fetchMovie} from "../../features/moviesSlice";
import {movieApiWidthId} from "../../services/movieApi";

const MovieDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {details} = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovie(movieApiWidthId(id)));
  }, []);
  return (
	  <div>
		  <img src={details.Poster} alt="" />
    </div>
  );
};

export default MovieDetails;
