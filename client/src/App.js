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
import Profile from './components/Profile';
import Pending from './components/Pending';
import Reports from './components/Reports';
import ReadComics from './components/ReadComics';
import ErrorBoundary from './components/Common/ErrorBoundary';
import Notification from './components/Common/Notification/index';
import {PrivateRoute, AdminRoute, UserRoute} from './components/Common/PrivateRoute/PrivateRoute';

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
                <Route path="/profile/*" element={<UserRoute><Profile /></UserRoute>} />
                <Route path="/create/*" element={<UserRoute><Create /></UserRoute>} />
                <Route path="/edit/*" element={<UserRoute><Edit /></UserRoute>} />
                <Route path="/read/comics/:id" element={<PrivateRoute><ReadComics /></PrivateRoute>} />
                <Route path="/admin/pending/*" element={<AdminRoute><Pending /></AdminRoute>} />
                <Route path="/admin/reports/*" element={<AdminRoute><Reports /></AdminRoute>} />
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
