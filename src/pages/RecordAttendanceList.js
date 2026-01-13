import React, { useMemo, useState } from 'react';
import '../styles/RecordAttendanceList.css';

function RecordAttendanceList({ selectedClass, onHome, onSubmit, onBack }) {
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

  // default a few checked just to look like the mock
  const [present, setPresent] = useState(() => {
    const initial = {};
    students.forEach((s, idx) => {
      initial[s.id] = idx % 2 === 0; // alternating true/false
    });
    return initial;
  });

  const toggle = (id) => {
    setPresent((p) => ({ ...p, [id]: !p[id] }));
  };

  const handleSubmit = () => {
    const presentIds = Object.entries(present)
      .filter(([, isPresent]) => isPresent)
      .map(([id]) => id);

    onSubmit({ selectedClass, presentIds });
  };

  return (
    <div className="ral-page">
      <div className="ral-wrapper">
        <header className="ral-topbar">
          <div className="ral-title-wrap">
            <h1 className="ral-title">Record Attendance</h1>
            <div className="ral-subtitle">Student List</div>
            {selectedClass ? (
              <div className="ral-context">
                Class: <b>{selectedClass.name}</b> — {selectedClass.type} — {selectedClass.seriesGroup}
              </div>
            ) : (
              <div className="ral-context">
                Class: <b>—</b>
              </div>
            )}
          </div>

          <div className="ral-top-actions">
            <button className="ral-secondary-btn" onClick={onBack}>
              Back
            </button>
            <button className="ral-home-btn" onClick={onHome}>
              Home
            </button>
          </div>
        </header>

        <div className="ral-card">
          <div className="ral-table">
            <div className="ral-row ral-header">
              <div>Name</div>
              <div>Group</div>
              <div className="ral-center">Attendance</div>
            </div>

            {students.map((s) => (
              <div key={s.id} className="ral-row ral-item">
                <div>{s.name}</div>
                <div>{s.group}</div>

                <div className="ral-center">
                  <label className="ral-check">
                    <input
                      type="checkbox"
                      checked={!!present[s.id]}
                      onChange={() => toggle(s.id)}
                    />
                    <span className="ral-check-ui" />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="ral-actions">
            <button className="ral-primary-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordAttendanceList;
