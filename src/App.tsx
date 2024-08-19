import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import RegisterUser from "./components/RegisterUser";
import LandingPage from "./components/landing/LandingPage";

function App() {
  

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/login' element={<HomePage />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/profile' element={<ProfilePage />} /> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
