import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchMovies} from "./../../features/moviesSlice";
import MoviesList from "../../components/MoviesList/MoviesList";
import styles from "./Search.module.scss";

import {searchApi} from "../../services/movieApi";

import clear from "./../../images/trash.svg";

const Search = () => {
  const dispatch = useDispatch();
  const {search} = useSelector((state) => state.movies);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(searchMovies(searchApi(inputValue)));
  }, [inputValue, dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const onClickClear = (e) => {
    e.preventDefault();
    setInputValue("");
  };

  return (
    <div className='container'>
      <form className={styles.searchForm}>
        <input
          onChange={handleInputChange}
          value={inputValue}
          type='text'
          placeholder='The name of the movie'
          className={styles.searchInput}
        />
        {inputValue && (
          <button onClick={onClickClear} type='submit' className={styles.searchBtn}>
            <img src={clear} alt='' />
          </button>
        )}
      </form>
      <MoviesList movies={search} />
    </div>
  );
};

export default Search;
