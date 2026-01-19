import React, { useState } from 'react';
import '../styles/ManageStudentRequests.css';

function ProcessCertificateRequest({ request, onHome, onBack }) {
  const [uploadedName, setUploadedName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUploadMock = () => {
    // Mock upload action
    setUploadedName('certificate_generated.pdf');
  };

  const handleApproveSend = () => {
    setIsSuccess(true);
  };

  // --- SUCCESS VIEW (Standard Green Check) ---
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
          {/* --- HEADER --- */}
          <div className="request-header">
            <h2>Process Certificate Request</h2>
          </div>

          {/* --- DETAILS GRID --- */}
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

          {/* --- UPLOAD SECTION --- */}
          <div className="action-section">
            <h4 className="section-title">Action Required</h4>
            <p style={{marginBottom: '10px', fontSize:'0.9rem'}}>Please upload the generated certificate PDF.</p>

            <div className="upload-area">
              {uploadedName ? (
                  <div className="file-attached">
                    <span style={{color:'green', fontWeight:'bold'}}>✓ Ready to Send:</span> {uploadedName}
                    <button className="text-btn" onClick={() => setUploadedName('')}>Remove</button>
                  </div>
              ) : (
                  <button className="secondary-btn small" onClick={handleUploadMock}>
                    + Upload Certificate
                  </button>
              )}
            </div>
          </div>

          {/* --- NAVIGATION --- */}
          <div className="nav-buttons">
            <button className="secondary-btn" onClick={onBack}>
              Back
            </button>

            <button
                className="primary-btn"
                onClick={handleApproveSend}
                disabled={!uploadedName}
            >
              Approve & Send
            </button>
          </div>
        </div>
      </div>
  );
}

export default ProcessCertificateRequest;