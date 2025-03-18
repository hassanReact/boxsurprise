import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserSignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;