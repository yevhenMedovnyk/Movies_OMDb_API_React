import Layout from "./components/Layout/Layout";
import {Navigate, Route, Routes} from "react-router-dom";
import "./App.scss";
import Want from "./pages/Want/Want";
import Watched from "./pages/Watched/Watched";
import Search from "./pages/Search/Search";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Registration from "./pages/Register/Register";

import {useAuth} from "./hooks/useAuth";
import {useSelector} from "react-redux";
import {collection, query, where} from "firebase/firestore";
import {db} from "./firebase";
import {addMovieToWant, addMovieToWatched} from "./redux/slices/movieSlice";
import {useFetchMovieFromFirebase} from "./hooks/useFirebaseMovieList";

function App() {
  const {isAuth} = useAuth();
  const RequireAuth = ({children}) => {
    return isAuth ? children : <Navigate to='/login' />;
  };

  const {id: userId} = useSelector((state) => state.user);
  const q = query(collection(db, "want"), where("userId", "==", userId));
  const qw = query(collection(db, "watched"), where("userId", "==", userId));

  useFetchMovieFromFirebase(q, addMovieToWant);
  useFetchMovieFromFirebase(qw, addMovieToWatched);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Search />} />
          <Route
            path='want'
            element={
              <RequireAuth>
                <Want />
              </RequireAuth>
            }
          />
          <Route
            path='watched'
            element={
              <RequireAuth>
                <Watched />
              </RequireAuth>
            }
          />
          <Route path='movie/:id' element={<MovieDetails />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Registration />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
