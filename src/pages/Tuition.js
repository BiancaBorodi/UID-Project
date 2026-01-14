import React, { useState } from 'react';

function Tuition({ onBack }) {
    const [paid, setPaid] = useState(false);

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh' }}>
            <div className="dashboard-wrapper">
                <header className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button onClick={onBack} className="logout-btn" style={{backgroundColor: '#6c757d'}}>← Back</button>
                        <h1>Settle Tuition / Installment</h1>
                    </div>
                </header>

                <div className="bg-white shadow rounded-lg p-6" style={{ background: 'white', padding: '30px', borderRadius: '12px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ 
                        padding: '15px', 
                        borderRadius: '8px', 
                        marginBottom: '20px', 
                        borderLeft: '5px solid',
                        borderColor: paid ? '#28a745' : '#dc3545',
                        backgroundColor: paid ? '#d4edda' : '#f8d7da'
                    }}>
                        <p style={{ fontWeight: 'bold', margin: 0 }}>
                            {paid ? "Status: Up to Date" : "Status: Payment Overdue"}
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Semester 2 Tuition Fee</span>
                            <span style={{ fontWeight: 'bold' }}>1500.00 EUR</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                            <span>Late Fee Penalty</span>
                            <span>25.00 EUR</span>
                        </div>
                        <hr style={{ margin: '20px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total Due:</span>
                            <span style={{ color: '#003366' }}>1525.00 EUR</span>
                        </div>
                    </div>

                    {!paid ? (
                        <button 
                            onClick={() => setPaid(true)}
                            className="menu-tile"
                            style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'block', textAlign: 'center' }}
                        >
                            Pay Securely via StudentPay
                        </button>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '15px', background: '#e9ecef', borderRadius: '8px', color: '#495057', fontWeight: 'bold' }}>
                            Paid Successfully - Receipt #8821 Generated
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tuition;