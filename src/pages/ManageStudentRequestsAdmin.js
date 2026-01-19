import React, { useMemo, useState } from 'react';
import '../styles/ManageStudentRequests.css';

function ManageStudentRequestsAdmin({ onHome, onView }) {
  const requests = useMemo(
      () => [
        {
          id: 'r1',
          student: 'Popescu Andrei',
          group: 'Group 1',
          date: '2026-01-10',
          docRequested: 'Student Certificate',
          purpose: 'Scholarship file',
          submittedDocs: ['id_scan.pdf', 'request_form.png'],
        },
        {
          id: 'r2',
          student: 'Ionescu Maria',
          group: 'Group 2',
          date: '2026-01-11',
          docRequested: 'Diploma Copy',
          purpose: 'Job application',
          submittedDocs: ['id_scan.pdf'],
        },
        {
          id: 'r3',
          student: 'Radu Mihai',
          group: 'Group 3',
          date: '2026-01-12',
          docRequested: 'Enrollment Proof',
          purpose: 'Dorm administration',
          submittedDocs: ['doc.pdf', 'doc.png'],
        },
        {
          id: 'r4',
          student: 'Dumitrescu Ana',
          group: 'Group 1',
          date: '2026-01-12',
          docRequested: 'Transcript Request',
          purpose: 'Erasmus application',
          submittedDocs: ['passport.pdf', 'application.png'],
        },
        {
          id: 'r5',
          student: 'Stan Ioana',
          group: 'Group 2',
          date: '2026-01-13',
          docRequested: 'Student Certificate',
          purpose: 'Bank account benefits',
          submittedDocs: ['id_scan.pdf', 'proof.png'],
        },
      ],
      []
  );

  const [selectedId, setSelectedId] = useState(null);
  const selectedRequest = requests.find((r) => r.id === selectedId);

  return (
      <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="request-container">
          <div className="request-header">
            <h2>Manage Student Requests</h2>
          </div>

          <div className="progress-bar">
            <span className="step-indicator active">1. Pending Requests</span>
            <span className="step-indicator">2. Process Request</span>
          </div>

          <h4 className="section-title">Pending List</h4>

          <table className="request-table">
            <thead>
            <tr>
              <th>Student</th>
              <th>Group</th>
              <th>Date</th>
              <th>Document</th>
            </tr>
            </thead>
            <tbody>
            {requests.map((r) => {
              const isSelected = r.id === selectedId;
              return (
                  <tr
                      key={r.id}
                      className={`clickable-row ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedId(r.id)}
                  >
                    <td style={{fontWeight: 'bold'}}>{r.student}</td>
                    <td>{r.group}</td>
                    <td>{r.date}</td>
                    <td>{r.docRequested}</td>
                  </tr>
              );
            })}
            </tbody>
          </table>

          <div className="nav-buttons">
            <button className="secondary-btn" onClick={onHome}>
              Home
            </button>

            <button
                className="primary-btn"
                onClick={() => selectedRequest && onView(selectedRequest)}
                disabled={!selectedRequest}
            >
              Process Request
            </button>
          </div>
        </div>
      </div>
  );
}

export default ManageStudentRequestsAdmin;