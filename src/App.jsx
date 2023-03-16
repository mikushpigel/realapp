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
import Deletefav from "./components/recipes-form/deleteFav";
import DeleteAll from "./components/recipes-form/DeleteAll";
import ViewFullRecipe from "./components/recipes-form/ViewFullRecipe";
import BuyList from "./components/buy-list/BuyList";
import BlessUser from "./components/common/blessUser";
import DeleteProd from "./components/buy-list/DeleteProd";
import DeleteAllBuyList from "./components/buy-list/DeleteAllBuyList";

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
          {/* <Route
            path="/my-favorites/full-recipe/:fullRecipe"
            element={
              <ProtectedRoute forPremium>
                <ViewFullRecipe />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/my-favorites/delete/:id"
            element={
              <ProtectedRoute forPremium>
                <Deletefav />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-favorites/deleteAll"
            element={
              <ProtectedRoute forPremium>
                <DeleteAll />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-favorites"
            element={
              <ProtectedRoute forPremium>
                <MyFavorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-buylist"
            element={
              <ProtectedRoute forPremium>
                <BuyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-shopingList/delete/:id"
            element={
              <ProtectedRoute forPremium>
                <DeleteProd redirect={"/my-buylist"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-shopingList/deleteAll"
            element={
              <ProtectedRoute forPremium>
                <DeleteAllBuyList redirect={"/my-buylist"} />
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
