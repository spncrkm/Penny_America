import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
// import { useState } from "react";

import ProfilePage from "./components/ProfilePage";
import RegisterUser from "./components/RegisterUser";
import { Provider } from "react-redux";
import { store } from "./store";
import NavBar from "./components/navbar/NavBar.";

function App() {
  // const [userToken, setUserToken] = useState("");
  // const [isLoggedIn, setIsloggedIn] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/dashboard' element={<NavBar />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
