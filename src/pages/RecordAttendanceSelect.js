import React, { useMemo, useState } from 'react';
import '../styles/RecordAttendanceSelect.css';

function RecordAttendanceSelect({ onHome, onConfirm }) {
  const classes = useMemo(
    () => [
      { id: 'uid-lect-cal-en', name: 'UID', type: 'Lecture', seriesGroup: 'Cal EN', nrStudents: 30444 },
      { id: 'hci-seminar-gr1', name: 'HCI', type: 'Seminar', seriesGroup: 'Group 1', nrStudents: 28 },
      { id: 'db-lab-gr2', name: 'Databases', type: 'Lab', seriesGroup: 'Group 2', nrStudents: 22 },
      { id: 'os-lect-cal-ro', name: 'Operating Systems', type: 'Lecture', seriesGroup: 'Cal RO', nrStudents: 240 },
      { id: 'net-lab-gr3', name: 'Computer Networks', type: 'Lab', seriesGroup: 'Group 3', nrStudents: 24 },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState(classes[0]?.id ?? '');

  const selectedClass = classes.find((c) => c.id === selectedId);

  const handleConfirm = () => {
    if (!selectedClass) return;
    onConfirm(selectedClass);
  };

  return (
    <div className="ra-page">
      <div className="ra-wrapper">
        <header className="ra-topbar">
          <div className="ra-title-wrap">
            <h1 className="ra-title">Record Attendance</h1>
            <div className="ra-subtitle">Select held class:</div>
          </div>

          <button className="ra-home-btn" onClick={onHome}>
            Home
          </button>
        </header>

        <div className="ra-card">
          <div className="ra-table">
            <div className="ra-row ra-header">
              <div>Name</div>
              <div>Type</div>
              <div>Series/Group</div>
              <div className="ra-right">Nr students</div>
            </div>

            {classes.map((cls) => {
              const active = cls.id === selectedId;
              return (
                <button
                  key={cls.id}
                  type="button"
                  className={`ra-row ra-item ${active ? 'is-active' : ''}`}
                  onClick={() => setSelectedId(cls.id)}
                >
                  <div>{cls.name}</div>
                  <div>{cls.type}</div>
                  <div>{cls.seriesGroup}</div>
                  <div className="ra-right">{cls.nrStudents}</div>
                </button>
              );
            })}
          </div>

          <div className="ra-actions">
            <div className="ra-hint">
              Selected: <b>{selectedClass ? `${selectedClass.name} (${selectedClass.type})` : '—'}</b>
            </div>
            <button className="ra-primary-btn" onClick={handleConfirm} disabled={!selectedClass}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordAttendanceSelect;
