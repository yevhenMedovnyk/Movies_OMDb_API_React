import Layout from "./components/Layout/Layout";
import "./App.scss";
import {Route, Routes} from "react-router-dom";
import Want from "./pages/Want/Want";
import Watched from "./pages/Watched/Watched";
import Search from "./pages/Search/Search";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Search />} />
          <Route path="want" element={<Want />} />
          <Route path='watched' element={<Watched />} />
          <Route path='movie/:id' element={<MovieDetails />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
