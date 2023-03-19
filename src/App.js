import Layout from "./components/Layout/Layout";
import "./App.scss";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Want from "./pages/Want/Want";
import Watched from "./pages/Watched/Watched";
import Search from "./pages/Search/Search";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Want />} />
          <Route path='watched' element={<Watched />} />
          <Route path='search' element={<Search />} />
          <Route path='movie/:id' element={<MovieDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
