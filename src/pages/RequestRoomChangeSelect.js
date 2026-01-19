import React, { useMemo, useState } from 'react';
import '../styles/RequestRoomChange.css';

function RequestRoomChangeSelect({ onHome, onConfirm }) {
    const classes = useMemo(
        () => [
            { id: 'uid-lect-a1', name: 'UID', type: 'Lecture', room: 'A1' },
            { id: 'hci-seminar-c12', name: 'HCI', type: 'Seminar', room: 'C12' },
            { id: 'db-lab-l3', name: 'Databases', type: 'Lab', room: 'L3' },
            { id: 'os-lect-b2', name: 'Operating Systems', type: 'Lecture', room: 'B2' },
            { id: 'net-lab-l2', name: 'Comp. Networks', type: 'Lab', room: 'L2' },
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
            <div className="room-container">
                <div className="room-header">
                    <h2>Request Room Change</h2>
                </div>

                <div className="progress-bar">
                    <span className="step-indicator active">1. Select Class</span>
                    <span className="step-indicator">2. Request Status</span>
                </div>

                <h4 className="section-title">Select Held Class</h4>

                <table className="room-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Current Room</th>
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
                                <td>{cls.room}</td>
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

export default RequestRoomChangeSelect;