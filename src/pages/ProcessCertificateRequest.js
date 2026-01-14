import React, { useState } from 'react';
import '../styles/ProcessCertificateRequest.css';

function ProcessCertificateRequest({ request, onHome, onBack }) {
  const [uploadedName, setUploadedName] = useState('');

  const handleUploadMock = () => {
    // Mock upload (no backend). Just simulate a chosen file.
    setUploadedName('certificate_generated.pdf');
  };

  const handleApproveSend = () => {
    alert(`Approved & sent for ${request?.student ?? 'student'}.`);
    onHome();
  };

  const handleReset = () => {
    setUploadedName('');
  };

  return (
    <div className="pcr-page">
      <div className="pcr-wrapper">
        <header className="pcr-topbar">
          <div className="pcr-title-wrap">
            <h1 className="pcr-title">Process certificate request</h1>
            <div className="pcr-subtitle">Request details:</div>
          </div>

          <div className="pcr-top-actions">
            <button className="pcr-secondary-btn" onClick={onBack}>
              Back
            </button>
            <button className="pcr-home-btn" onClick={onHome}>
              Home
            </button>
          </div>
        </header>

        <div className="pcr-card">
          <div className="pcr-details">
            <div className="pcr-row">
              <div className="pcr-key">Student:</div>
              <div className="pcr-val">{request?.student ?? '—'}</div>
            </div>

            <div className="pcr-row">
              <div className="pcr-key">Group:</div>
              <div className="pcr-val">{request?.group ?? '—'}</div>
            </div>

            <div className="pcr-row">
              <div className="pcr-key">Requested Document:</div>
              <div className="pcr-val">{request?.docRequested ?? '—'}</div>
            </div>

            <div className="pcr-row">
              <div className="pcr-key">Purpose:</div>
              <div className="pcr-val">{request?.purpose ?? '—'}</div>
            </div>

            <div className="pcr-row pcr-row-files">
              <div className="pcr-key">Submitted Documents:</div>
              <div className="pcr-val">
                <div className="pcr-files">
                  {(request?.submittedDocs ?? []).map((f) => (
                    <span key={f} className="pcr-file-pill">
                      {f}
                    </span>
                  ))}
                  {(request?.submittedDocs ?? []).length === 0 && <span className="pcr-muted">—</span>}
                </div>
              </div>
            </div>

            <div className="pcr-row pcr-row-files">
              <div className="pcr-key">Uploaded certificate:</div>
              <div className="pcr-val">
                {uploadedName ? <span className="pcr-file-pill">{uploadedName}</span> : <span className="pcr-muted">None</span>}
              </div>
            </div>
          </div>

          <div className="pcr-actions">
            <button className="pcr-secondary-cta" onClick={handleUploadMock}>
              Upload certificate
            </button>

            <div className="pcr-right-actions">
              <button className="pcr-primary-btn" onClick={handleApproveSend} disabled={!request}>
                Approve &amp; Send
              </button>
              <button className="pcr-secondary-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessCertificateRequest;
