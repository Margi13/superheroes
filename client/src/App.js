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
import MyComics from './components/MyComics';
import Pending from './components/Pending';
import ReadComics from './components/ReadComics';
import ErrorBoundary from './components/Common/ErrorBoundary';
import Notification from './components/Common/Notification/index';
import PrivateRoute from './components/Common/PrivateRoute/index';

function App() {

  return (
    <ErrorBoundary>

      <AuthProvider>
        <NotificationProvider>

          <div id="box">
            <Header />
            <Notification />
            <main id="main-content">

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalog/*" element={<Catalog />} />
                <Route path="/details/*" element={<Details />} />
                <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
                <Route path="/my-heroes" element={<PrivateRoute><MyHeroes /></PrivateRoute>} />
                <Route path="/my-comics" element={<PrivateRoute><MyComics /></PrivateRoute>} />
                <Route path="/create/*" element={<PrivateRoute><Create /></PrivateRoute>} />
                <Route path="/edit/*" element={<PrivateRoute><Edit /></PrivateRoute>} />
                <Route path="/read/comics/:id" element={<PrivateRoute><ReadComics /></PrivateRoute>} />
                <Route path="/admin/pending/*" element={<PrivateRoute><Pending /></PrivateRoute>} />
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
