import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
