import React from 'react';
import '../styles/RequestRoomChange.css';

function RequestRoomChangeStatus({ selectedClass, onHome, onBack }) {
  return (
      <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="room-container">
          {/* --- HEADER --- */}
          <div className="room-header">
            <h2>Request Room Change</h2>
          </div>

          {/* --- CONTEXT INFO --- */}
          <div className="context-box">
            <h4 style={{margin:0, color: 'var(--text-main)'}}>
              {selectedClass ? selectedClass.name : 'Class'}
            </h4>
            <p style={{margin:0, fontSize:'0.9rem', color:'#666'}}>
              {selectedClass?.type} — Current: <strong>{selectedClass?.room}</strong>
            </p>
          </div>

          <div className="status-section">
            <h4 className="section-title">Request Status</h4>

            <div className="timeline">
              {/* Step 1: Submitted (Active) */}
              <div className="timeline-item active">
                <div className="timeline-icon">✓</div>
                <div className="timeline-content">
                  <strong>Submitted</strong>
                  <p>Request received by administration.</p>
                </div>
              </div>

              {/* Step 2: In Review */}
              <div className="timeline-item">
                <div className="timeline-icon">•</div>
                <div className="timeline-content">
                  <strong>Reviewed</strong>
                  <p>Pending approval from Facility Manager.</p>
                </div>
              </div>

              {/* Step 3: Decision */}
              <div className="timeline-item">
                <div className="timeline-icon">•</div>
                <div className="timeline-content">
                  <strong>Approved / Rejected</strong>
                  <p>Final decision notification.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-note">
            <p>An email has been sent with a tracking link for this request.</p>
          </div>

          {/* --- NAVIGATION --- */}
          <div className="nav-buttons">
            <button className="secondary-btn" onClick={onBack}>
              Back
            </button>
            <button className="primary-btn" onClick={onHome}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
  );
}

export default RequestRoomChangeStatus;