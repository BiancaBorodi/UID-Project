import React, { useState } from 'react';

function BookAppointment({ onBack }) {
    const [booked, setBooked] = useState(null);
    const slots = ["09:00 - 09:30", "10:30 - 11:00", "14:00 - 14:30", "15:30 - 16:00"];

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh' }}>
            <div className="dashboard-wrapper">
                <header className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button onClick={onBack} className="logout-btn" style={{backgroundColor: '#6c757d'}}>← Back</button>
                        <h1>Book Secretariat Appointment</h1>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '15px' }}>Available Slots: Tomorrow</h3>
                        {slots.map((slot) => (
                            <div key={slot} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                                <span>{slot}</span>
                                <button 
                                    onClick={() => setBooked(slot)}
                                    style={{ padding: '5px 15px', borderRadius: '5px', border: 'none', background: '#003366', color: 'white', cursor: 'pointer' }}
                                >
                                    Select
                                </button>
                            </div>
                        ))}
                    </div>

                    {booked && (
                        <div style={{ background: '#e7f3ff', padding: '20px', borderRadius: '12px', border: '2px dashed #003366', textAlign: 'center' }}>
                            <h3 style={{ color: '#003366' }}>Confirm Booking</h3>
                            <p>You have selected: <strong>{booked}</strong></p>
                            <button 
                                onClick={() => { alert("Appointment Confirmed!"); setBooked(null); }}
                                className="menu-tile"
                                style={{ width: '100%', marginTop: '20px', border: 'none' }}
                            >
                                Confirm Appointment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookAppointment;