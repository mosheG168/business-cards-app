import { Routes, Route } from "react-router-dom";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import CreateCardPage from "./components/pages/CreateCardPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CardsPage from "./components/pages/CardsPage";
import MyCardsPage from "./components/pages/MyCardsPage";
import FavoriteCardsPage from "./components/pages/FavoriteCardsPage";
import EditCardPage from "./components/pages/EditCardPage";
import LandingPage from "./components/pages/LandingPage";
import { Toolbar } from "@mui/material";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CardDetailsPage from "./components/pages/CardDetailsPage";
import AboutPage from "./components/pages/AboutPage";
import AdminPage from "./components/pages/AdminPage";
import EditProfilePage from "./components/pages/EditProfilePage";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <>
      <Header />

      <Toolbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/create-card"
            element={
              <ProtectedRoute bizOnly={true}>
                <CreateCardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/cards" element={<CardsPage />} />
          <Route
            path="/my-cards"
            element={
              <ProtectedRoute bizOnly={true}>
                <MyCardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoriteCardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-card/:cardId"
            element={
              <ProtectedRoute bizOnly={true}>
                <EditCardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/cards/:cardId" element={<CardDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
