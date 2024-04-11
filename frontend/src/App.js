import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import LandingPage from './pages/Landing';
import StudentPage from './pages/Student1';

function App() {
  const { user } = useAuthContext();

  const getEmailDomain = () => {
    if (user && user.email) {
      const [, domain] = user.email.split('@');
      return domain;
    }
    return null;
  };

  const emailDomain = getEmailDomain();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {user && (
              <>
                {/* Open main page only if teacher logged in*/}
                {emailDomain === 'vit.com' && (
                  <Route path="/home" element={<Home />} />
                )}
                {/* Open student page only if student logged in*/}
                {emailDomain === 'vitstudent.com' && (
                  <Route path="/student" element={<StudentPage />} />
                )}
                {/* Redirect user to correct page */}
                <Route path="/login" element={<Navigate to={emailDomain === 'vitstudent.com' ? '/student' : '/home'} />} />
                {/* Route for signup */}
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            {/* Route for login */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
