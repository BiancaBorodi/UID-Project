import React, { useState, useEffect } from 'react';
import '../styles/BookAppointment.css';

function BookAppointment({ onBack }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const tempDates = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            tempDates.push(d);
        }
        setDates(tempDates);
    }, []);

    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00"
    ];

    const isSlotAvailable = (dateObj, timeString) => {
        const today = new Date();
        if (dateObj.toDateString() !== today.toDateString()) return true;

        const [hours, minutes] = timeString.split(':').map(Number);
        const slotTime = new Date(today);
        slotTime.setHours(hours, minutes, 0);

        return slotTime > today;
    };

    const handleConfirm = () => setIsConfirmed(true);

    const formatDateDisplay = (date) => {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNum = date.getDate();
        return { dayName, dayNum };
    };

    if (isConfirmed) {
        return (
            <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <div className="appointment-container" style={{ textAlign: 'center' }}>
                    <div className="appointment-header">
                        <h2>Appointment Confirmed</h2>
                    </div>
                    <div className="success-message">
                        <div style={{ fontSize: '4rem', color: 'green', marginBottom: '10px' }}>✓</div>
                        <p>Your appointment is scheduled for:</p>
                        <h3 style={{ color: 'var(--text-main)', marginTop: '5px' }}>
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h3>
                        <h2 style={{ color: 'var(--primary-red)' }}>{selectedSlot}</h2>
                    </div>
                    <div className="nav-buttons" style={{ justifyContent: 'center' }}>
                        <button className="primary-btn" onClick={onBack}>Return Home</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="appointment-container">
                <div className="appointment-header">
                    <h2>Book Secretariat Appointment</h2>
                </div>

                {/* 1. SELECT DATE */}
                <h4 className="section-title">1. Select Date</h4>
                <div className="calendar-grid">
                    {dates.map((date, index) => {
                        const { dayName, dayNum } = formatDateDisplay(date);
                        const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();

                        return (
                            <div
                                key={index}
                                className={`date-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedDate(date);
                                    setSelectedSlot(null);
                                }}
                            >
                                <span className="day-name">{dayName}</span>
                                <span className="day-num">{dayNum}</span>
                            </div>
                        );
                    })}
                </div>

                {/* 2. SELECT TIME */}
                {selectedDate && (
                    <div className="fade-in">
                        <h4 className="section-title" style={{ marginTop: '20px' }}>
                            2. Select Time <span style={{fontWeight:'normal', fontSize:'0.9rem'}}>for {selectedDate.toLocaleDateString()}</span>
                        </h4>

                        <div className="time-grid">
                            {timeSlots.map((time) => {
                                const available = isSlotAvailable(selectedDate, time);
                                const isSelected = selectedSlot === time;

                                return (
                                    <button
                                        key={time}
                                        className={`time-chip ${isSelected ? 'selected' : ''}`}
                                        disabled={!available}
                                        onClick={() => setSelectedSlot(time)}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                        {selectedDate.toDateString() === new Date().toDateString() &&
                            timeSlots.every(t => !isSlotAvailable(selectedDate, t)) && (
                                <p style={{color: 'red', fontSize: '0.9rem', marginTop:'10px'}}>
                                    No more slots available for today. Please choose another date.
                                </p>
                            )}
                    </div>
                )}

                <div className="nav-buttons">
                    <button className="secondary-btn" onClick={onBack}>Cancel</button>
                    <button
                        className="primary-btn"
                        disabled={!selectedDate || !selectedSlot}
                        onClick={handleConfirm}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookAppointment;