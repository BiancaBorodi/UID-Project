import React, { useMemo, useState } from 'react';
import '../styles/RecordAttendance.css';

function RecordAttendanceSelect({ onHome, onConfirm }) {
    const classes = useMemo(
        () => [
            { id: 'uid-lect-cal-en', name: 'UID', type: 'Lecture', seriesGroup: 'Cal EN', nrStudents: 30444 },
            { id: 'hci-seminar-gr1', name: 'HCI', type: 'Seminar', seriesGroup: 'Group 1', nrStudents: 28 },
            { id: 'db-lab-gr2', name: 'Databases', type: 'Lab', seriesGroup: 'Group 2', nrStudents: 22 },
            { id: 'os-lect-cal-ro', name: 'Operating Systems', type: 'Lecture', seriesGroup: 'Cal RO', nrStudents: 240 },
            { id: 'net-lab-gr3', name: 'Comp. Networks', type: 'Lab', seriesGroup: 'Group 3', nrStudents: 24 },
        ],
        []
    );

    const [selectedId, setSelectedId] = useState(null);
    const selectedClass = classes.find((c) => c.id === selectedId);

    const handleConfirm = () => {
        if (!selectedClass) return;
        onConfirm(selectedClass);
    };

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="attendance-container">
                <div className="attendance-header">
                    <h2>Record Attendance</h2>
                </div>

                <div className="progress-bar">
                    <span className="step-indicator active">1. Select Class</span>
                    <span className="step-indicator">2. Mark Attendance</span>
                    <span className="step-indicator">3. Confirm</span>
                </div>

                <h4 className="section-title">Select Held Class</h4>

                <table className="attendance-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Group</th>
                        <th>Students</th>
                    </tr>
                    </thead>
                    <tbody>
                    {classes.map((cls) => {
                        const isSelected = cls.id === selectedId;
                        return (
                            <tr
                                key={cls.id}
                                className={`clickable-row ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedId(cls.id)}
                            >
                                <td style={{fontWeight: 'bold'}}>{cls.name}</td>
                                <td>{cls.type}</td>
                                <td>{cls.seriesGroup}</td>
                                <td>{cls.nrStudents}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                <div className="nav-buttons">
                    <button className="secondary-btn" onClick={onHome}>
                        Cancel
                    </button>

                    <button
                        className="primary-btn"
                        onClick={handleConfirm}
                        disabled={!selectedClass}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecordAttendanceSelect;