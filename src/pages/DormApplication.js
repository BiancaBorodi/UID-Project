import React, { useState } from 'react';
import '../styles/DormApplication.css';

function DormApplication({ onBack }) {
    const [submitted, setSubmitted] = useState(false);
    const [fileAttached, setFileAttached] = useState(false);

    if (submitted) {
        return (
            <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <div className="dorm-container" style={{ textAlign: 'center' }}>
                    <div className="dorm-header">
                        <h2>Application Submitted</h2>
                    </div>

                    <div className="success-message">
                        <div style={{ fontSize: '4rem', color: 'green', marginBottom: '10px' }}>✓</div>
                        <h3 style={{ color: 'var(--text-main)', marginTop: '5px' }}>Received Successfully</h3>
                        <p style={{ marginTop: '20px', color: '#666' }}>
                            Your application for the 2025/2026 academic year is now under review.
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                            You will be notified of the allocation result via email.
                        </p>
                    </div>

                    <div className="nav-buttons" style={{ justifyContent: 'center' }}>
                        <button className="primary-btn" onClick={onBack}>Return to Dashboard</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="dorm-container">
                <div className="dorm-header">
                    <h2>Dormitory Application</h2>
                </div>

                <div className="dorm-form">
                    <div className="form-group">
                        <label>Room Type Preference</label>
                        <select className="std-input">
                            <option>Single Room (Private Bath)</option>
                            <option>Double Room (Shared Bath)</option>
                            <option>Quad Suite</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Building Preference</label>
                        <select className="std-input">
                            <option>Main Campus Hall</option>
                            <option>West Side Residency</option>
                            <option>International Student House</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{color: 'var(--primary-red)'}}>Income Statement (PDF) *</label>
                        <p style={{fontSize:'0.9rem', marginBottom:'10px', color:'#555'}}>
                            Please upload a scan of your <strong>Income Statement</strong> for financial aid consideration.
                        </p>

                        <div
                            className="upload-box"
                            onClick={() => setFileAttached(!fileAttached)}
                            style={{
                                borderColor: fileAttached ? 'var(--success-green)' : 'var(--text-main)',
                                backgroundColor: fileAttached ? '#e8f5e9' : '#f9f9f9'
                            }}
                        >
                            {fileAttached
                                ? <span style={{color:'green', fontWeight:'bold'}}>✓ File Attached</span>
                                : <span>+ Click here to upload PDF</span>
                            }
                        </div>
                        {!fileAttached && <div style={{color:'red', fontSize:'0.8rem', marginTop:'5px'}}>* Required</div>}
                    </div>

                </div>

                <div className="nav-buttons">
                    <button className="secondary-btn" onClick={onBack}>
                        Cancel
                    </button>

                    <button
                        className="primary-btn"
                        onClick={() => setSubmitted(true)}
                        disabled={!fileAttached}
                    >
                        Submit Application
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DormApplication;