import { useSelector} from "react-redux";
import MoviesList from "../../components/MoviesList/MoviesList";

const Watched = () => {
  const {watched} = useSelector((state) => state.movies);

  return (
    <div className='container'>
      <MoviesList movies={watched} />
    </div>
  );
};

export default Watched;
