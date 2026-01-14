import React, { useMemo, useState } from 'react';
import '../styles/ManageStudentRequestsAdmin.css';

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

  const [selectedId, setSelectedId] = useState(requests[0]?.id ?? '');
  const selectedRequest = requests.find((r) => r.id === selectedId);

  return (
    <div className="msra-page">
      <div className="msra-wrapper">
        <header className="msra-topbar">
          <div className="msra-title-wrap">
            <h1 className="msra-title">Manage student requests</h1>
            <div className="msra-subtitle">Pending requests:</div>
          </div>

          <button className="msra-home-btn" onClick={onHome}>
            Home
          </button>
        </header>

        <div className="msra-card">
          <div className="msra-table">
            <div className="msra-row msra-header">
              <div>Student</div>
              <div>Group</div>
              <div>Date</div>
              <div>Doc. requested</div>
            </div>

            {requests.map((r) => {
              const active = r.id === selectedId;
              return (
                <button
                  key={r.id}
                  type="button"
                  className={`msra-row msra-item ${active ? 'is-active' : ''}`}
                  onClick={() => setSelectedId(r.id)}
                >
                  <div>{r.student}</div>
                  <div>{r.group}</div>
                  <div>{r.date}</div>
                  <div>{r.docRequested}</div>
                </button>
              );
            })}
          </div>

          <div className="msra-actions">
            <div className="msra-hint">
              Selected: <b>{selectedRequest ? selectedRequest.student : '—'}</b>
            </div>

            <button
              className="msra-primary-btn"
              onClick={() => selectedRequest && onView(selectedRequest)}
              disabled={!selectedRequest}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageStudentRequestsAdmin;
