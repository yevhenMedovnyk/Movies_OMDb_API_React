import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAuth} from "./../../hooks/useAuth";

import MoviesList from "../../components/MoviesList/MoviesList";
import {useEffect} from "react";

const Want = () => {
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  const {want} = useSelector((state) => state.movies);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
	
	

  return (
    <div className='container'>
      <MoviesList movies={want} />
    </div>
  );
};

export default Want;
