import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/Home";
import BackOffice from "./pages/backOffice";
import BackUser from "./pages/backUser";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import UserProfile from "./pages/userProfile";

import BackCommentaire from "./pages/backCommentaire";
import BackCommentaireUpdate from "./pages/backCommentaire/update";

import CommentaireCreate from "./pages/commentaire/create";
import CommentaireUpdate from "./pages/commentaire/update";

import BackContribution from "./pages/backContribution";
import Contribution from "./pages/contribution";
import EditContribution from "./pages/contribution/update";
import ValidateContribution from "./pages/backContribution/validate";

import BackEspece from "./pages/backEspece";
import BackEspeceCreate from "./pages/backEspece/create";
import BackEspeceUpdate from "./pages/backEspece/update";

import BackFamille from "./pages/backFamille";
import BackFamilleCreate from "./pages/backFamille/create";
import BackFamilleUpdate from "./pages/backFamille/update";

import BackHabitat from "./pages/backHabitat";
import BackHabitatCreate from "./pages/backHabitat/create";
import BackHabitatUpdate from "./pages/backHabitat/update";

import BackTemperament from "./pages/backTemperament";
import BackTemperamentCreate from "./pages/backTemperament/create";
import BackTemperamentUpdate from "./pages/backTemperament/update";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/backOffice" element={<BackOffice />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/backUser" element={<BackUser />} />

            <Route path="/backCommentaire" element={<BackCommentaire />} />
            <Route
              path="/backCommentaire/update/:id_commentaire"
              element={<BackCommentaireUpdate />}
            />
            <Route
              path="/commentaire/create/:id_espece"
              element={<CommentaireCreate />}
            />
            <Route
              path="/commentaire/update/:id_commentaire"
              element={<CommentaireUpdate />}
            />
            <Route path="/backContribution" element={<BackContribution />} />
            <Route
              path="/backContribution/validate/:id_contribution"
              element={<ValidateContribution />}
            />
            <Route path="/contribution" element={<Contribution />} />
            <Route
              path="/contribution/update/:id"
              element={<EditContribution />}
            />

            <Route path="/backEspece" element={<BackEspece />} />
            <Route path="/backEspece/create" element={<BackEspeceCreate />} />
            <Route
              path="/backEspece/update/:id"
              element={<BackEspeceUpdate />}
            />

            <Route path="/backHabitat" element={<BackHabitat />} />
            <Route path="/backHabitat/create" element={<BackHabitatCreate />} />
            <Route
              path="/backHabitat/update/:id_habitat"
              element={<BackHabitatUpdate />}
            />

            <Route path="/backTemperament" element={<BackTemperament />} />
            <Route
              path="/backTemperament/create"
              element={<BackTemperamentCreate />}
            />
            <Route
              path="/backTemperament/update/:id"
              element={<BackTemperamentUpdate />}
            />

            <Route path="/backFamille" element={<BackFamille />} />
            <Route path="/backFamille/create" element={<BackFamilleCreate />} />
            <Route
              path="/backFamille/update/:id"
              element={<BackFamilleUpdate />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
