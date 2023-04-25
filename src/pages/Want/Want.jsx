import { useSelector} from "react-redux";

import MoviesList from "../../components/MoviesList/MoviesList";

const Want = () => {
  const {want} = useSelector((state) => state.movies);

  return (
    <div className='container'>
      <MoviesList movies={want} />
    </div>
  );
};

export default Want;
