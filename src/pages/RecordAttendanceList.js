import React, { useMemo, useState } from 'react';
import '../styles/RecordAttendance.css';

function RecordAttendanceList({ selectedClass, onHome, onSubmit, onBack }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const students = useMemo(
      () => [
        { id: 's1', name: 'Popescu Andrei', group: 'Group 1' },
        { id: 's2', name: 'Ionescu Maria', group: 'Group 1' },
        { id: 's3', name: 'Radu Mihai', group: 'Group 2' },
        { id: 's4', name: 'Dumitrescu Ana', group: 'Group 2' },
        { id: 's5', name: 'Stan Ioana', group: 'Group 3' },
        { id: 's6', name: 'Marin Vlad', group: 'Group 3' },
      ],
      []
  );

  const [present, setPresent] = useState(() => {
    const initial = {};
    students.forEach((s, idx) => {
      initial[s.id] = idx % 2 === 0;
    });
    return initial;
  });

  const toggle = (id) => {
    setPresent((p) => ({ ...p, [id]: !p[id] }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (onSubmit) {
    }
  };

  if (isSubmitted) {
    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="attendance-container" style={{ textAlign: 'center' }}>
            <div className="attendance-header">
              <h2>Attendance Saved</h2>
            </div>

            <div className="progress-bar">
              <span className="step-indicator">1. Select Class</span>
              <span className="step-indicator">2. Mark Attendance</span>
              <span className="step-indicator active">3. Confirm</span>
            </div>

            <div className="success-message">
              <div style={{ fontSize: '4rem', color: 'green', marginBottom: '10px' }}>✓</div>
              <h3 style={{ color: 'var(--text-main)', marginTop: '5px' }}>
                Submission Successful
              </h3>
              <p style={{ marginTop: '20px', color: '#666' }}>
                You have successfully recorded attendance for:
              </p>
              <h4 style={{ color: 'var(--text-main)', margin: '10px 0' }}>
                {selectedClass ? selectedClass.name : 'Class'}
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Count: <strong>{Object.values(present).filter(Boolean).length}</strong> present / {students.length} total
              </p>
            </div>

            <div className="nav-buttons" style={{ justifyContent: 'center' }}>
              <button className="primary-btn" onClick={onHome}>Return to Dashboard</button>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="attendance-container">
          <div className="attendance-header">
            <h2>Record Attendance</h2>
          </div>

          <div className="progress-bar">
            <span className="step-indicator">1. Select Class</span>
            <span className="step-indicator active">2. Mark Attendance</span>
            <span className="step-indicator">3. Confirm</span>
          </div>

          <div className="context-box">
            <h4 style={{margin:0, color: 'var(--text-main)'}}>
              {selectedClass ? `${selectedClass.name} (${selectedClass.type})` : 'Class'}
            </h4>
            <p style={{margin:0, fontSize:'0.9rem', color:'#666'}}>
              {selectedClass?.seriesGroup}
            </p>
          </div>

          <h4 className="section-title">Mark Present Students</h4>

          <table className="attendance-table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Group</th>
              <th style={{width: '80px', textAlign: 'center'}}>Status</th>
            </tr>
            </thead>
            <tbody>
            {students.map((s) => {
              const isPresent = !!present[s.id];
              return (
                  <tr
                      key={s.id}
                      className={`clickable-row ${isPresent ? 'selected' : ''}`}
                      onClick={() => toggle(s.id)}
                  >
                    <td>{s.name}</td>
                    <td>{s.group}</td>
                    <td style={{textAlign:'center'}}>
                      <div className={`checkbox-custom ${isPresent ? 'checked' : ''}`}>
                        {isPresent && '✓'}
                      </div>
                    </td>
                  </tr>
              );
            })}
            </tbody>
          </table>

          <div className="nav-buttons">
            <button className="secondary-btn" onClick={onBack}>
              Back
            </button>

            <button className="primary-btn" onClick={handleSubmit}>
              Submit List
            </button>
          </div>
        </div>
      </div>
  );
}

export default RecordAttendanceList;