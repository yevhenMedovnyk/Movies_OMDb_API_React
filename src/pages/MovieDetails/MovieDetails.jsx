import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./MovieDetails.module.scss";

import {addMovieToWant, addMovieToWatched, fetchMovie} from "../../redux/slices/movieSlice";
import {movieApiWithId} from "../../services/movieApi";
import {useAuth} from "../../hooks/useAuth";
import {deleteDoc, doc, setDoc} from "firebase/firestore";

import {db} from "../../firebase";

import InfoList from "../../components/InfoList/InfoList";
import ButtonsBlock from "../../components/ButtonsBlock/ButtonsBlock";

const MovieDetails = () => {
  const navigate = useNavigate();
  const [inWant, setInWant] = useState(false);
  const [inWatched, setInWatched] = useState(false);
  const {id} = useParams();
  const dispatch = useDispatch();
  const {details, want, watched} = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const {isAuth} = useAuth();

  const removeFromFirebase = async (list) => {
    await deleteDoc(doc(db, list, details.imdbID));
  };

  const addToWant = async () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      await setDoc(doc(db, "want", details.imdbID), {
        userId: user.id,
        Title: details.Title,
        Year: details.Year,
        Poster: details.Poster,
        imdbID: details.imdbID,
      });
      dispatch(addMovieToWant(details));
      removeFromFirebase("watched");
    }
  };
  const addToWatched = async () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      await setDoc(doc(db, "watched", details.imdbID), {
        userId: user.id,
        Title: details.Title,
        Year: details.Year,
        Poster: details.Poster,
        imdbID: details.imdbID,
      });
      dispatch(addMovieToWatched(details));
      removeFromFirebase("want");
    }
  };
  const onClickBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchMovie(movieApiWithId(id)));
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
            <ButtonsBlock
              inWant={inWant}
              addToWant={addToWant}
              inWatched={inWatched}
              addToWatched={addToWatched}
              id={id}
              removeFromFirebase={removeFromFirebase}
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.poster}>
            <img src={details.Poster} alt='' />
          </div>
          <InfoList details={details} />
        </div>
        <button onClick={onClickBack} className={styles.back}>
          Back
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
