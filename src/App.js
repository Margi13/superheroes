import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import Footer from './components/Footer';
import Create from './components/Create';
import Catalog from './components/Catalog';
import Details from './components/Details';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Error from './components/Error';
import { useState } from 'react';

const initialAuthState = {
  _id: '',
  email: '',
  accessToken: ''
}
function App() {
  const [user, setUser ] = useLocalStorage('user',initialAuthState)

  const login = (authData) => {
    setUser(authData);
  }

  const logout = () => {
    setUser(initialAuthState)
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>

      <div id="box">
        <Header />
        <main id="main-content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/details/:heroId" element={<Details />} />
            <Route path="/*" element={<Error />} />
          </Routes>


        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
