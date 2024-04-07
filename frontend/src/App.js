import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/navbar'
import Login from './pages/login';
import Signup from './pages/signup';
import About from './pages/about';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} =useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/home"/> : <Navigate to="/about"/>}
              />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/about"/> }
              />
              <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/home"/>}
              />
              <Route
              path="/signup"
              element={!user ? <Signup/> : <Navigate to="/home"/>}
              />
              <Route
                path="/about"
                element={<About/>}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
