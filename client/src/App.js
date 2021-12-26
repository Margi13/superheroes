import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header';
import Footer from './components/Footer';
import Create from './components/Create';
import Catalog from './components/Catalog';
import Details from './components/Details';
import Edit from './components/Edit';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Error from './components/Error';
import ErrorBoundary from './components/Common/ErrorBoundary';

function App() {

  return (
    <ErrorBoundary>

      <AuthProvider>

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
              <Route path="/edit/:heroId" element={<Edit />} />
              <Route path="/*" element={<Error />} />
            </Routes>


          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
