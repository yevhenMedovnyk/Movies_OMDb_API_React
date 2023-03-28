import {useSelector} from "react-redux";

import MoviesList from "../../components/MoviesList/MoviesList";
import styles from "./Want.module.scss";

const Want = () => {


  const {want} = useSelector((state) => state.movies);
  return (
    <div className='container'>
      <MoviesList movies={want} />
    </div>
  );
};

export default Want;
