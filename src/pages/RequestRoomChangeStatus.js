import React from 'react';
import '../styles/RequestRoomChangeStatus.css';

function RequestRoomChangeStatus({ selectedClass, onHome, onBack }) {
  return (
    <div className="rrcst-page">
      <div className="rrcst-wrapper">
        <header className="rrcst-topbar">
          <div className="rrcst-title-wrap">
            <h1 className="rrcst-title">Request room change</h1>
            <div className="rrcst-subtitle">Request sent!</div>
          </div>

          <div className="rrcst-top-actions">
            <button className="rrcst-secondary-btn" onClick={onBack}>
              Back
            </button>
            <button className="rrcst-home-btn" onClick={onHome}>
              Home
            </button>
          </div>
        </header>

        <div className="rrcst-card">
          {selectedClass ? (
            <div className="rrcst-context">
              For: <b>{selectedClass.name}</b> — {selectedClass.type} — current room <b>{selectedClass.room}</b>
            </div>
          ) : (
            <div className="rrcst-context">
              For: <b>—</b>
            </div>
          )}

          <div className="rrcst-section">
            <div className="rrcst-label">Status:</div>

            <div className="rrcst-status-list">
              <div className="rrcst-status-item">
                <span className="rrcst-check">✓</span>
                <span>Submitted</span>
              </div>

              <div className="rrcst-status-item is-muted">
                <span className="rrcst-bullet">•</span>
                <span>Reviewed</span>
              </div>

              <div className="rrcst-status-item is-muted">
                <span className="rrcst-bullet">•</span>
                <span>Approved/Rejected</span>
              </div>
            </div>
          </div>

          <div className="rrcst-note">
            An email has been sent with this link to track the progress of your request.
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestRoomChangeStatus;
