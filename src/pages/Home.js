import React from 'react';
import '../styles/Home.css';

function Home({ user, onLogout, onNavigate }) {
    const services = [
        { id: 'plan-study', label: "Plan next-term study plan" },
        { id: 'enroll-exam', label: "Enroll in an exam session" },
        { id: 'cert', label: "Request an official certificate" },
        { id: 'tuition', label: "Settle tuition / installment" },
        { id: 'appoint', label: "Book appointment with secretariat" },
        { id: 'dorm', label: "Apply for dorm" },
        { id: 'attend', label: "Record attendance" },
        { id: 'room', label: "Request room change" },
        { id: 'req-manage', label: "Manage student requests" }
    ];

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh' }}>
            <div className="dashboard-wrapper">

                <header className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <h1>Home</h1>
                        <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                            | {user}
                        </span>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>
                        Log Out
                    </button>
                </header>

                <div className="menu-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="menu-tile"
                            onClick={() => {
                                if (service.id === 'plan-study') {
                                    onNavigate('plan-study');
                                }
                                else if (service.id === 'enroll-exam') {
                                    onNavigate('enroll-exam');
                                }
                                else if (service.id === 'cert') {
                                    onNavigate('request-cert');
                                }
                                else if (service.id === 'tuition') {
                                    onNavigate('tuition');
                                }
                                else if (service.id === 'appoint') {
                                    onNavigate('appoint');
                                }
                                else if (service.id === 'dorm') {
                                    onNavigate('dorm');
                                }
                                else if (service.id === 'attend') {
                                    onNavigate('attend-select');
                                }
                                else if (service.id === 'room') {
                                    onNavigate('room-select');
                                }
                                else if (service.id === 'req-manage') {
                                    onNavigate('req-manage');
                                }
                                else {
                                    alert("This feature is coming soon!");
                                }
                            }}
                        >
                            <span>{service.label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Home;