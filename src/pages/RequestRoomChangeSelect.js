import React, { useMemo, useState } from 'react';
import '../styles/RequestRoomChangeSelect.css';

function RequestRoomChangeSelect({ onHome, onConfirm }) {
  const classes = useMemo(
    () => [
      { id: 'uid-lect-a1', name: 'UID', type: 'Lecture', room: 'A1' },
      { id: 'hci-seminar-c12', name: 'HCI', type: 'Seminar', room: 'C12' },
      { id: 'db-lab-l3', name: 'Databases', type: 'Lab', room: 'L3' },
      { id: 'os-lect-b2', name: 'Operating Systems', type: 'Lecture', room: 'B2' },
      { id: 'net-lab-l2', name: 'Computer Networks', type: 'Lab', room: 'L2' },
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
    <div className="rrcs-page">
      <div className="rrcs-wrapper">
        <header className="rrcs-topbar">
          <div className="rrcs-title-wrap">
            <h1 className="rrcs-title">Request room change</h1>
            <div className="rrcs-subtitle">Select held class:</div>
          </div>

          <button className="rrcs-home-btn" onClick={onHome}>
            Home
          </button>
        </header>

        <div className="rrcs-card">
          <div className="rrcs-table">
            <div className="rrcs-row rrcs-header">
              <div>Name</div>
              <div>Type</div>
              <div className="rrcs-right">Room</div>
            </div>

            {classes.map((cls) => {
              const active = cls.id === selectedId;
              return (
                <button
                  key={cls.id}
                  type="button"
                  className={`rrcs-row rrcs-item ${active ? 'is-active' : ''}`}
                  onClick={() => setSelectedId(cls.id)}
                >
                  <div>{cls.name}</div>
                  <div>{cls.type}</div>
                  <div className="rrcs-right">{cls.room}</div>
                </button>
              );
            })}
          </div>

          <div className="rrcs-actions">
            <div className="rrcs-hint">
              Selected: <b>{selectedClass ? `${selectedClass.name} (${selectedClass.type})` : '—'}</b>
            </div>

            <button className="rrcs-primary-btn" onClick={handleConfirm} disabled={!selectedClass}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestRoomChangeSelect;
