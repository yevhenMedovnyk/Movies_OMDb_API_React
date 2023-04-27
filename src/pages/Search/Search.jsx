import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {searchMovies, setInputValue, setType, setCategoryId} from "./../../redux/slices/searchSlice";
import MoviesList from "../../components/MoviesList/MoviesList";
import styles from "./Search.module.scss";

import {searchApi} from "../../services/movieApi";

import PaginationRounded from "../../components/Pagination/Pagination";
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "../../hooks/useDebounce";
import Button from "../../components/UI/Button/Button";

import clear from "./../../images/trash.svg";

const Search = () => {
  const dispatch = useDispatch();
  const {search} = useSelector((state) => state.search);
  const {inputValue, type, categoryId} = useSelector((state) => state.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(parseInt(pageQuery || 1));
  const inputRef = useRef(null);

  const debouncedValue = useCallback(useDebounce(inputValue, 400));

  useEffect(() => {
    if (inputValue) {
      dispatch(searchMovies(searchApi(debouncedValue, currentPage, type)));
    }
  }, [dispatch, currentPage, debouncedValue, type]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setInputValue(value));
  };

  const onClickClear = () => {
    dispatch(setInputValue(""));
    inputRef.current.focus();
  };

  const handleChangePage = (_, pageNum) => {
    setCurrentPage(pageNum);
  };
  const categories = ["movie", "series"];
  const onClickCategory = (id, item) => {
    dispatch(setCategoryId(id));
    dispatch(setType(item));
  };

  return (
    <div className='container'>
      <div className={styles.wrapper}>
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
        <div className={styles.btns}>
          {categories.map((item, i) => (
            <Button key={i} text={item} id={i} onClick={onClickCategory} categoryId={categoryId} />
          ))}
        </div>
      </div>

      {search?.length > 0 && (
        <PaginationRounded onPageChange={handleChangePage} page={currentPage} />
      )}
      <MoviesList movies={search} />
    </div>
  );
};

export default Search;
