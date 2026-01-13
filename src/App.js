import React, { useState } from 'react';
import './styles/global.css';
import Login from './pages/Login';
import Home from './pages/Home';
import PlanStudy from './pages/PlanStudy';
import ExamEnrollment from './pages/ExamEnrollment';
import CertificateRequest from './pages/CertificateRequest';
import RecordAttendanceSelect from './pages/RecordAttendanceSelect';
import RecordAttendanceList from './pages/RecordAttendanceList';
import RequestRoomChangeSelect from './pages/RequestRoomChangeSelect';
import RequestRoomChangeStatus from './pages/RequestRoomChangeStatus';
import ManageStudentRequestsAdmin from './pages/ManageStudentRequestsAdmin';
import ProcessCertificateRequest from './pages/ProcessCertificateRequest';

function App() {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedClass, setSelectedClass] = useState(null);
    const [roomSelectedClass, setRoomSelectedClass] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);

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
        } else if (currentPage === 'attend-select') {
            content = (
                <RecordAttendanceSelect
                    onHome={() => setCurrentPage('home')}
                    onConfirm={(cls) => {
                        setSelectedClass(cls);
                        setCurrentPage('attend-list');
                    }}
                />
            );
        } else if (currentPage === 'attend-list') {
            content = (
                <RecordAttendanceList
                    selectedClass={selectedClass}
                    onHome={() => setCurrentPage('home')}
                    onBack={() => setCurrentPage('attend-select')}
                    onSubmit={({ selectedClass, presentIds }) => {
                        // For now just show a confirmation. Later you can replace this with storing/sending.
                        alert(
                            `Attendance submitted for ${selectedClass?.name ?? 'class'}.\nPresent: ${presentIds.length} students.`
                        );
                        setCurrentPage('home');
                    }}
                />
            );
        } else if (currentPage === 'room-select') {
            content = (
                <RequestRoomChangeSelect
                    onHome={() => setCurrentPage('home')}
                    onConfirm={(cls) => {
                        setRoomSelectedClass(cls);
                        setCurrentPage('room-status');
                    }}
                />
            );
        } else if (currentPage === 'room-status') {
            content = (
                <RequestRoomChangeStatus
                    selectedClass={roomSelectedClass}
                    onHome={() => setCurrentPage('home')}
                    onBack={() => setCurrentPage('room-select')}
                />
            );
        } else if (currentPage === 'req-manage') {
            content = (
                <ManageStudentRequestsAdmin
                    onHome={() => setCurrentPage('home')}
                    onView={(req) => {
                        setSelectedRequest(req);
                        setCurrentPage('req-process');
                    }}
                />
            );
        } else if (currentPage === 'req-process') {
            content = (
                <ProcessCertificateRequest
                    request={selectedRequest}
                    onHome={() => setCurrentPage('home')}
                    onBack={() => setCurrentPage('req-manage')}
                />
            );
        }
    }

    return (
        <div className="App">
            {content}
        </div>
    );
}

export default App;