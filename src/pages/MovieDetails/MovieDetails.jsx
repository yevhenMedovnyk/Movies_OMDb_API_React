import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./MovieDetails.module.scss";

import {fetchMovie} from "../../features/movieSlice";
import {
  addMovieToWant,
  addMovieToWatched,
  removeFromWant,
  removeFromWatched,
} from "../../features/movieSlice";
import {movieApiWidthId} from "../../services/movieApi";
import {useAuth} from "../../hooks/useAuth";

import remove from "./../../images/trash.svg";

const MovieDetails = () => {
  const navigate = useNavigate();
  const [inWant, setInWant] = useState(false);
  const [inWatched, setInWatched] = useState(false);
  const {id} = useParams();
  const dispatch = useDispatch();
  const {details, want, watched} = useSelector((state) => state.movies);
  const {isAuth} = useAuth();

  const addToWant = () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      dispatch(addMovieToWant(details));
    }
  };
  const addToWatched = () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      dispatch(addMovieToWatched(details));
    }
  };
  const onClickBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(fetchMovie(movieApiWidthId(id)));
  }, []);

  useEffect(() => {
    if (want.find((item) => item.imdbID === id)) {
      setInWant(true);
    } else {
      setInWant(false);
    }
    if (watched.find((item) => item.imdbID === id)) {
      setInWatched(true);
    } else {
      setInWatched(false);
    }
  }, [inWant, inWatched, id, want, watched]);

  return (
    <div className='container'>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.textBlock}>
            <h1 className={styles.title}>{details.Title}</h1>
            <div className={styles.headerInfo}>
              <span className={styles.year}>{details.Released}</span>
              <span className={styles.genre}> {details.Genre}</span>
              <span className={styles.runtime}>{details.Runtime}</span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.rating}>
              <span>IMDb RATING</span>
              <p>
                <span className={styles.ratingValue}>{details.imdbRating}</span> / 10
              </p>
            </div>
            <div className={styles.btns}>
              <button
                disabled={inWatched ? true : false}
                onClick={addToWatched}
                className={styles.addBtn}
              >
                Watched
              </button>
              <button
                disabled={inWant ? true : false}
                onClick={addToWant}
                className={styles.addBtn}
              >
                Want
              </button>
            </div>

            {inWatched && (
              <img
                onClick={() => dispatch(removeFromWatched(id))}
                className={styles.remove}
                src={remove}
                alt='remove'
              />
            )}
            {inWant && (
              <img
                onClick={() => dispatch(removeFromWant(id))}
                className={styles.remove}
                src={remove}
                alt='remove'
              />
            )}
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.poster}>
            <img src={details.Poster} alt='' />
          </div>
          <div className={styles.info}>
            <p>
              Director:
              <span> {details.Director}</span>
            </p>
            <p>
              Actors:
              <span> {details.Actors}</span>
            </p>
            <p>
              Writer:
              <span> {details.Writer}</span>
            </p>
            <p>
              Awards:
              <span> {details.Awards}</span>
            </p>
            <p>
              Language:
              <span> {details.Language}</span>
            </p>
            <p>
              Country:
              <span> {details.Country}</span>
            </p>
            <p>
              Plot:
              <span> {details.Plot}</span>
            </p>
          </div>
        </div>
        <button onClick={onClickBack} className={styles.back}>
          Back
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;