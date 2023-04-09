import {useNavigate} from "react-router-dom";
import {useAuth} from "./../../hooks/useAuth";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import MoviesList from "../../components/MoviesList/MoviesList";

const Watched = () => {
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  const {watched} = useSelector((state) => state.movies);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <div className='container'>
      <MoviesList movies={watched} />
    </div>
  );
};

export default Watched;
