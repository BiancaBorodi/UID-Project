import React, { useState } from 'react';
import './styles/global.css';
import Login from './pages/Login';
import Home from './pages/Home';
import PlanStudy from './pages/PlanStudy';
import ExamEnrollment from './pages/ExamEnrollment';
import CertificateRequest from './pages/CertificateRequest';
import Tuition from './pages/Tuition';
import BookAppointment from './pages/BookAppointment';
import DormApplication from './pages/DormApplication';

function App() {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');

    const handleLogin = (username) => {
        setUser(username);
        setCurrentPage('home');
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentPage('home');
    };

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    let content;
    if (!user) {
        content = <Login onLoginSuccess={handleLogin} />;
    } else {
        if (currentPage === 'home') {
            content = <Home user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
        } else if (currentPage === 'plan-study') {
            content = <PlanStudy onBack={() => setCurrentPage('home')} />;
        } else if (currentPage === 'enroll-exam') {
            content = <ExamEnrollment onBack={() => setCurrentPage('home')} />;
        } else if (currentPage === 'request-cert') {
            content = <CertificateRequest onBack={() => setCurrentPage('home')} />;
        } else if (currentPage === 'tuition') {
            content = <Tuition onBack={() => setCurrentPage('home')} />;
        } else if (currentPage === 'appoint') {
            content = <BookAppointment onBack={() => setCurrentPage('home')} />;
        } else if (currentPage === 'dorm') {
            content = <DormApplication onBack={() => setCurrentPage('home')} />;
        }
    }

    return (
        <div className="App">
            {content}
        </div>
    );
}

export default App;