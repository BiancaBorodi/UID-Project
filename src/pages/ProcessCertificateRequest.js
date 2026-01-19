import React, { useState } from 'react';
import '../styles/ManageStudentRequests.css';

function ProcessCertificateRequest({ request, onHome, onBack }) {
  const [fileAttached, setFileAttached] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApproveSend = () => {
    setIsSuccess(true);
  };

  // --- SUCCESS VIEW ---
  if (isSuccess) {
    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="request-container" style={{ textAlign: 'center' }}>
            <div className="request-header">
              <h2>Request Processed</h2>
            </div>

            <div className="success-message">
              <div style={{ fontSize: '4rem', color: 'green', marginBottom: '10px' }}>✓</div>
              <h3 style={{ color: 'var(--text-main)', marginTop: '5px' }}>
                Approved & Sent
              </h3>
              <p style={{ marginTop: '20px', color: '#666' }}>
                Certificate has been issued to <strong>{request?.student}</strong>.
              </p>
            </div>

            <div className="nav-buttons" style={{ justifyContent: 'center' }}>
              <button className="primary-btn" onClick={onHome}>Return to Dashboard</button>
            </div>
          </div>
        </div>
    );
  }

  // --- MAIN DETAIL VIEW ---
  return (
      <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="request-container">
          <div className="request-header">
            <h2>Process Certificate Request</h2>
          </div>

          <div className="progress-bar">
            <span className="step-indicator">1. Pending Requests</span>
            <span className="step-indicator active">2. Process Request</span>
          </div>

          <div className="details-grid">
            <div className="detail-row">
              <span className="label">Student:</span>
              <span className="value">{request?.student}</span>
            </div>
            <div className="detail-row">
              <span className="label">Group:</span>
              <span className="value">{request?.group}</span>
            </div>
            <div className="detail-row">
              <span className="label">Requested:</span>
              <span className="value" style={{color: 'var(--primary-red)', fontWeight:'bold'}}>{request?.docRequested}</span>
            </div>
            <div className="detail-row">
              <span className="label">Purpose:</span>
              <span className="value">{request?.purpose}</span>
            </div>

            <div className="detail-row">
              <span className="label">Submitted Docs:</span>
              <div className="file-list">
                {(request?.submittedDocs ?? []).length > 0 ? (
                    request.submittedDocs.map((f, i) => (
                        <span key={i} className="file-pill">{f}</span>
                    ))
                ) : (
                    <span style={{color:'#999'}}>—</span>
                )}
              </div>
            </div>
          </div>

          <hr style={{margin: '20px 0', border: '0', borderTop: '1px solid #eee'}} />

          <div className="action-section">
            <h4 className="section-title">Action Required</h4>
            <p style={{marginBottom: '10px', fontSize:'0.9rem'}}>Please upload the generated certificate PDF.</p>

            <div
                className="upload-box"
                onClick={() => setFileAttached(!fileAttached)}
                style={{
                  borderColor: fileAttached ? 'var(--success-green)' : 'var(--text-main)',
                  backgroundColor: fileAttached ? '#e8f5e9' : '#f9f9f9',
                  color: fileAttached ? 'var(--success-green)' : 'var(--text-main)'
                }}
            >
              {fileAttached
                  ? <span>✓ Certificate PDF Attached</span>
                  : <span>+ Click here to upload generated PDF</span>
              }
            </div>
          </div>

          <div className="nav-buttons">
            <button className="secondary-btn" onClick={onBack}>
              Back
            </button>

            <button
                className="primary-btn"
                onClick={handleApproveSend}
                disabled={!fileAttached}
            >
              Approve & Send
            </button>
          </div>
        </div>
      </div>
  );
}

export default ProcessCertificateRequest;