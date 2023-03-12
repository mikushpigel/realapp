import "./SASS/main.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import AboutUs from "./components/AboutUs";
import { Route, Routes } from "react-router-dom";
import QuickandEasy from "./components/Quick&Easy";
import MyFavorites from "./components/MyFavorites";
import SignIn from "./components/Sign-in";
import SignUp from "./components/Sign-up";
import Hamburger from "./components/Hamburger";
import DeskNavbar from "./components/DeskNavbar";
import Index from "./components/Index";
import Footer from "./components/Footer";
import SearchForm from "./components/recipes-form/SearchForm";
import SignUpPremium from "./components/sign-up-premium";
import SignOut from "./components/Sign-out";
import PasswordRecovery from "./components/PasswordRecovery";
import ProtectedRoute from "./components/common/ProtectedRouth";
import PopUpFullRecipe from "./components/recipes-form/popUpFullRecipe";
import Products from "./components/recipes-form/Products";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <header>
        <Hamburger />
        <DeskNavbar />
      </header>

      <main>
        <Routes>
          <Route path="index" element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="search" element={<Products />} />
          {/* <Route path="search-form" element={<SearchForm />} /> */}
          <Route path="quick-and-easy" element={<QuickandEasy />} />

          <Route
            path="my-favorites"
            element={
              <ProtectedRoute forPremium>
                <MyFavorites />
              </ProtectedRoute>
            }
          />

          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-up-premium" element={<SignUpPremium />} />
          <Route path="sign-out" element={<SignOut redirect={"/"} />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
