import "./SASS/main.scss";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Recipes from "./components/Recipes";
import QuickandEasy from "./components/Quick&Easy";
import MyFavorites from "./components/MyFavorites";
import SignIn from "./components/Sign-in";
import SignUp from "./components/Sign-up";
import Hamburger from "./components/Hamburger";
import DeskNavbar from "./components/DeskNavbar";

function App() {
  return (
    <div className="App">
      <header>
        <Hamburger />
        <DeskNavbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="quick-and-easy" element={<QuickandEasy />} />
          <Route path="my-favorites" element={<MyFavorites />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
