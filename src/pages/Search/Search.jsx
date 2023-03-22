import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {searchMovies, setInputValue} from "./../../features/searchSlice";
import MoviesList from "../../components/MoviesList/MoviesList";
import styles from "./Search.module.scss";

import {searchApi} from "../../services/movieApi";

import clear from "./../../images/trash.svg";
import PaginationRounded from "../../components/Pagination/Pagination";
import {useLocation, useSearchParams} from "react-router-dom";
import {useDebounce} from "../../hooks/useDebounce";

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {search} = useSelector((state) => state.search);
  const {inputValue} = useSelector((state) => state.search);

  const [currentPage, setCurrentPage] = useState(parseInt(location.search.split("=")[1] || 1));
  const inputRef = useRef(null);

  const debouncedValue = useCallback(useDebounce(inputValue, 400));

	useEffect(() => {
    dispatch(searchMovies(searchApi(debouncedValue, currentPage)));
    inputRef.current.focus();
  }, [dispatch, currentPage, debouncedValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setInputValue(value));
  };

  const onClickClear = () => {
    dispatch(setInputValue(""));
  };

  const handleChangePage = (_, pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className='container'>
      <div className={styles.searchForm}>
        <input
          ref={inputRef}
          onChange={handleInputChange}
          value={inputValue}
          type='text'
          placeholder='Search movie'
          className={styles.searchInput}
        />
        {inputValue && (
          <button onClick={onClickClear} className={styles.searchBtn}>
            <img src={clear} alt='clear' />
          </button>
        )}
      </div>
      {search?.length > 0 && (
        <PaginationRounded onPageChange={handleChangePage} page={currentPage} />
      )}
      <MoviesList movies={search} />
    </div>
  );
};

export default Search;
