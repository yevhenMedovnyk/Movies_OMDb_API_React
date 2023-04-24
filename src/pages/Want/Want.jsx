import {useSelector} from "react-redux";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase";

import MoviesList from "../../components/MoviesList/MoviesList";
import {useEffect, useState} from "react";

const Want = () => {
  //const { want } = useSelector((state) => state.movies);
  const [want, setWant] = useState([]);

  const {id} = useSelector((state) => state.user);
  const q = query(collection(db, "want"), where("userId", "==", id));

  useEffect(() => {
    const fetchMovieFromFirebase = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setWant((prev) => [...prev, doc.data()]);
      });
    };
    fetchMovieFromFirebase();
  }, []);

  return (
    <div className='container'>
      <MoviesList movies={want} />
    </div>
  );
};

export default Want;
