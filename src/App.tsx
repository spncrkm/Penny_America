import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/navbar/NavBar.";
import { usePlaidLink } from "react-plaid-link";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ProfilePage from "./components/ProfilePage";
import RegisterUser from "./components/RegisterUser";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsloggedIn] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
