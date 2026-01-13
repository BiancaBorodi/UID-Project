import React, { useState } from 'react';

function DormApplication({ onBack }) {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh' }}>
            <div className="dashboard-wrapper">
                <header className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button onClick={onBack} className="logout-btn" style={{backgroundColor: '#6c757d'}}>← Back</button>
                        <h1>Dormitory Application</h1>
                    </div>
                </header>

                {!submitted ? (
                    <form style={{ background: 'white', padding: '30px', borderRadius: '12px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Room Type Preference</label>
                            <select style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                                <option>Single Room (Private Bath)</option>
                                <option>Double Room (Shared Bath)</option>
                                <option>Quad Suite</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Building Preference</label>
                            <select style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                                <option>Main Campus Hall</option>
                                <option>West Side Residency</option>
                                <option>International Student House</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Upload Income Statement (PDF)</label>
                            <input type="file" style={{ width: '100%', padding: '10px', border: '1px dashed #ccc' }} />
                        </div>

                        <button 
                            type="button"
                            onClick={() => setSubmitted(true)}
                            className="menu-tile"
                            style={{ width: '100%', border: 'none', cursor: 'pointer' }}
                        >
                            Submit Application
                        </button>
                    </form>
                ) : (
                    <div style={{ background: '#d4edda', padding: '40px', borderRadius: '12px', textAlign: 'center', marginTop: '20px' }}>
                        <h2 style={{ color: '#155724' }}>✓ Application Submitted</h2>
                        <p>Your application for the 2025/2026 academic year has been received. You will be notified of the result via email.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DormApplication;