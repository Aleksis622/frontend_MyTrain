import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Trains from "./pages/Trains";
import Tickets from "./pages/Tickets";
import Journeys from "./pages/Journeys";
import Stops from "./pages/Stops";
import RoutesPage from "./pages/Routes";
import Map from "./pages/Map";
import Profile from "./pages/Profile";

import { AuthProvider } from "./context/Auth";
import { LangProvider } from "./context/Lang";

function App() {
  return (
    <AuthProvider>
      <LangProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="/stops" element={<Stops />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </LangProvider>
    </AuthProvider>
  );
}

export default App;
