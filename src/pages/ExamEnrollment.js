import React, { useState } from 'react';
import '../styles/ExamEnrollment.css';

const COURSES = [
    { id: 'UID', name: 'User Interface Design', teacher: 'Prof. X', eligible: true },
    { id: 'DS', name: 'Distributed Systems', teacher: 'Prof. X', eligible: false, reason: 'Attendance < 50%' },
    { id: 'DBD', name: 'Database Design', teacher: 'Prof. X', eligible: true },
    { id: 'TD', name: 'Translator Design', teacher: 'Prof. X', eligible: true }
];

const SESSIONS = {
    'UID': [
        { id: 1, date: '2024-06-10', time: '09:00', room: 'C201', status: 'Available' },
        { id: 2, date: '2024-06-12', time: '14:00', room: 'C201', status: 'Available' }
    ],
    'DBD': [
        { id: 3, date: '2024-06-14', time: '10:00', room: 'Amphitheater', status: 'Available' },
        { id: 4, date: '2024-06-15', time: '16:00', room: 'Lab 304', status: 'Available' }
    ],
    'TD': [
        { id: 5, date: '2024-06-18', time: '08:00', room: 'C112', status: 'Available' },
        { id: 6, date: '2024-06-20', time: '12:00', room: 'C112', status: 'Full' }
    ]
};

function ExamEnrollment({ onBack }) {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [enrollments, setEnrollments] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [pendingSession, setPendingSession] = useState(null);

    const handleChooseCourse = (courseId) => {
        setSelectedCourseId(courseId);
    };

    const handleEnrollClick = (session) => {
        setPendingSession(session);
        setShowModal(true);
    };

    const confirmEnrollment = () => {
        setEnrollments({
            ...enrollments,
            [selectedCourseId]: `${pendingSession.date} at ${pendingSession.time}`
        });
        setShowModal(false);
        setPendingSession(null);
        setSelectedCourseId(null);
    };

    const renderCourseList = () => (
        <div>
            <h3>Your Courses</h3>
            <table className="exam-table">
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Eligible</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {COURSES.map(course => {
                    const isEnrolled = !!enrollments[course.id];
                    return (
                        <tr key={course.id}>
                            <td>{course.name} ({course.id})</td>
                            <td>{course.teacher}</td>
                            <td>
                                {course.eligible
                                    ? <span className="status-badge status-yes">Yes</span>
                                    : <span className="status-badge status-no">No</span>
                                }
                            </td>
                            <td>
                                {isEnrolled ? (
                                    <span className="status-badge status-enrolled">Enrolled</span>
                                ) : (
                                    <span style={{color:'#666'}}>-</span>
                                )}
                            </td>
                            <td>
                                {isEnrolled ? (
                                    <button className="action-btn" disabled>View</button>
                                ) : (
                                    <button
                                        className={`action-btn ${!course.eligible ? 'disabled' : ''}`}
                                        disabled={!course.eligible}
                                        onClick={() => handleChooseCourse(course.id)}
                                    >
                                        {course.eligible ? 'Choose' : 'Locked'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {!COURSES.some(c => c.eligible) && <p style={{color:'red'}}>You are not eligible for any exams yet.</p>}
        </div>
    );

    const renderSessionList = () => {
        const course = COURSES.find(c => c.id === selectedCourseId);
        const sessions = SESSIONS[selectedCourseId] || [];

        return (
            <div>
                {/* REMOVED: The top "Back to Courses" button to match PlanStudy layout */}

                <h3>Select Session for: <span style={{color:'var(--primary-red)'}}>{course.name}</span></h3>

                <table className="exam-table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Room</th>
                        <th>Availability</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sessions.map(session => (
                        <tr key={session.id}>
                            <td>{session.date}</td>
                            <td>{session.time}</td>
                            <td>{session.room}</td>
                            <td>
                                {session.status === 'Available'
                                    ? <span style={{color:'green', fontWeight:'bold'}}>Available</span>
                                    : <span style={{color:'red', fontWeight:'bold'}}>Full</span>
                                }
                            </td>
                            <td>
                                <button
                                    className={`action-btn ${session.status === 'Full' ? 'full' : ''}`}
                                    disabled={session.status === 'Full'}
                                    onClick={() => handleEnrollClick(session)}
                                >
                                    {session.status === 'Full' ? 'Closed' : 'Enroll'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div style={{padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
            <div className="exam-container">
                <div className="exam-header">
                    <h2>Enroll in an exam session</h2>
                </div>

                {selectedCourseId ? renderSessionList() : renderCourseList()}

                {/* --- NEW NAVIGATION BAR (Matches PlanStudy) --- */}
                <div className="nav-buttons">
                    {selectedCourseId ? (
                        // If inside a course (Level 2), Back button goes to Course List
                        <button className="secondary-btn" onClick={() => setSelectedCourseId(null)}>
                            Back
                        </button>
                    ) : (
                        // If at top level (Level 1), Back button goes Home (onBack prop)
                        <button className="secondary-btn" onClick={onBack}>
                            Cancel
                        </button>
                    )}

                    {/* Note: There is no global "Next" button here because the action
                        is taken inside the table rows ('Choose' or 'Enroll') */}
                </div>
                {/* ----------------------------------------------- */}

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Confirm Enrollment</h3>
                            <p>Are you sure you want to enroll for the <strong>{COURSES.find(c => c.id === selectedCourseId)?.name}</strong> exam in</p>
                            <p style={{background:'#f0f0f0', padding:'10px'}}>
                                {pendingSession?.date} <br/>
                                {pendingSession?.time} <br/>
                                Room {pendingSession?.room}
                            </p>
                            <div className="modal-actions">
                                <button className="secondary-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="primary-btn" onClick={confirmEnrollment}>Confirm</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ExamEnrollment;