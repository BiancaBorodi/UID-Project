import React, { useState } from 'react';
import '../styles/Tuition.css';

function Tuition({ onBack }) {
    const [paid, setPaid] = useState(false);

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="tuition-container">
                <div className="tuition-header">
                    <h2>Settle Tuition / Installment</h2>
                </div>

                <div className={`status-banner ${paid ? 'paid' : 'overdue'}`}>
                    <span className="status-icon">{paid ? '✓' : '!'}</span>
                    <div className="status-text">
                        <strong>{paid ? "Status: Up to Date" : "Status: Payment Overdue"}</strong>
                        <div style={{fontSize: '0.85rem'}}>
                            {paid ? "No further action required." : "Please settle immediately to avoid account hold."}
                        </div>
                    </div>
                </div>

                <div className="invoice-box">
                    <div className="invoice-row">
                        <span>Semester 2 Tuition Fee</span>
                        <span className="amount">1500.00 EUR</span>
                    </div>
                    <div className="invoice-row penalty">
                        <span>Late Fee Penalty</span>
                        <span className="amount">25.00 EUR</span>
                    </div>

                    <hr className="divider" />

                    <div className="invoice-row total">
                        <span>Total Due</span>
                        <span className="amount total-text">
                            {paid ? '0.00 EUR' : '1525.00 EUR'}
                        </span>
                    </div>
                </div>

                <div className="action-area">
                    {!paid ? (
                        <button
                            className="primary-btn pay-btn"
                            onClick={() => setPaid(true)}
                        >
                            Pay Online & Submit
                        </button>
                    ) : (
                        <div className="success-receipt">
                            Paid Successfully - Receipt #8821 Generated
                        </div>
                    )}
                </div>

                <div className="nav-buttons">
                    <button className="secondary-btn" onClick={onBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Tuition;