import { Routes, Route } from 'react-router-dom';

import { NotificationProvider } from './contexts/NotificationContext'
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
import MyHeroes from './components/MyHeroes';
import ErrorBoundary from './components/Common/ErrorBoundary';
import Notification from './components/Common/Notification/index';

function App() {

  return (
    <ErrorBoundary>

      <AuthProvider>
        <NotificationProvider>

          <div id="box">
            <Header />
            <Notification/>
            <main id="main-content">

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/my-heroes" element={<MyHeroes />} />
                <Route path="/details/:heroId" element={<Details />} />
                <Route path="/edit/:heroId" element={<Edit />} />
                <Route path="/*" element={<Error />} />
              </Routes>


            </main>
            <Footer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
