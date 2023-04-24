import {useSelector} from "react-redux";
import MoviesList from "../../components/MoviesList/MoviesList";
import { useEffect, useState } from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase";

const Watched = () => {
	//const { watched } = useSelector((state) => state.movies);
	const [watched, setWatched] = useState([]);

  const {id} = useSelector((state) => state.user);
  const q = query(collection(db, "watched"), where("userId", "==", id));

  useEffect(() => {
    const fetchMovieFromFirebase = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setWatched((prev) => [...prev, doc.data()]);
      });
    };
    fetchMovieFromFirebase();
  }, []);

  return (
    <div className='container'>
      <MoviesList movies={watched} />
    </div>
  );
};

export default Watched;
