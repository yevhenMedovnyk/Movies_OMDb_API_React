import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAuth} from "./../../hooks/useAuth";

import MoviesList from "../../components/MoviesList/MoviesList";
import {useEffect} from "react";

const Want = () => {
  const {want} = useSelector((state) => state.movies);

  return (
    <div className='container'>
      <MoviesList movies={want} />
    </div>
  );
};

export default Want;
