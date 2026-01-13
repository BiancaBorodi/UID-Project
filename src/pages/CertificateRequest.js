import React, { useState } from 'react';
import '../styles/CertificateRequest.css';

function CertificateRequest({ onBack }) {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState(null);
    const [purpose, setPurpose] = useState('');
    const [fileAttached, setFileAttached] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const certTypes = [
        { id: 1, name: 'Certificate of Enrollment', price: 0 },
        { id: 2, name: 'Academic Transcript', price: 20 },
        { id: 3, name: 'Degree Certificate (Duplicate)', price: 50 }
    ];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handlePay = () => {
        setTimeout(() => {
            setIsPaid(true);
            handleNext();
        }, 1000);
    };

    // STEP 1: CHOOSE TYPE
    const renderStep1 = () => (
        <div>
            <h3>Choose Certificate</h3>
            {certTypes.map(cert => (
                <div
                    key={cert.id}
                    className={`option-card ${selectedType === cert.id ? 'selected' : ''}`}
                    onClick={() => setSelectedType(cert.id)}
                >
                    <span>{cert.name}</span>
                    <span style={{fontWeight:'bold'}}>
                        {cert.price === 0 ? 'Free' : `${cert.price} RON`}
                    </span>
                </div>
            ))}
        </div>
    );

    // STEP 2: DETAILS
    const renderStep2 = () => (
        <div>
            <h3>Request Details</h3>

            <div className="form-group">
                <label>Purpose of Request</label>
                <textarea
                    placeholder="e.g., For visa application, scholarship..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label style={{color: 'var(--primary-red)'}}>Required Documents *</label>
                <p style={{fontSize:'0.9rem', marginBottom:'10px', color:'#555'}}>
                    Please upload a scan of your <strong>ID Card</strong> or <strong>Passport</strong> to verify identity.
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
                        ? <span style={{color:'green', fontWeight:'bold'}}>✓ ID Copy Attached</span>
                        : <span>+ Click here to upload ID Copy</span>
                    }
                </div>
                {!fileAttached && <div style={{color:'red', fontSize:'0.8rem', marginTop:'5px'}}>* Required</div>}
            </div>
        </div>
    );

    // STEP 3: PAYMENT
    const renderStep3 = () => {
        const cert = certTypes.find(c => c.id === selectedType);
        return (
            <div>
                <h3>Payment</h3>
                <div className="payment-summary">
                    <p>Item: <strong>{cert.name}</strong></p>
                    <span className="price-tag">{cert.price} RON</span>
                    <p style={{fontSize:'0.9rem', color:'#666'}}>Processing Fee included</p>
                </div>

                {cert.price > 0 ? (
                    <button className="pay-btn" onClick={handlePay}>
                        Pay Online & Submit
                    </button>
                ) : (
                    <button className="pay-btn" onClick={handleNext}>
                        Submit (Free)
                    </button>
                )}
            </div>
        );
    };

    // STEP 4: TRACKING
    const renderStep4 = () => (
        <div>
            <div style={{textAlign:'center', marginBottom:'30px'}}>
                <div style={{fontSize:'3rem', color:'green'}}>✓</div>
                <h3>Request Submitted!</h3>
                <p>An email has been sent with this tracking link.</p>
            </div>

            <div className="tracking-steps">
                <div className="track-step done">
                    <div className="step-icon">1</div>
                    <div>
                        <strong>Submitted</strong>
                        <div style={{fontSize:'0.8rem'}}>Today</div>
                    </div>
                </div>
                <div className="track-step">
                    <div className="step-icon">2</div>
                    <div>
                        <strong>Processing</strong>
                        <div style={{fontSize:'0.8rem'}}>Est. 2-3 days</div>
                    </div>
                </div>
                <div className="track-step">
                    <div className="step-icon">3</div>
                    <div>
                        <strong>Ready</strong>
                        <div style={{fontSize:'0.8rem'}}>Pick up at Secretariat</div>
                    </div>
                </div>
            </div>

            <button className="primary-btn" style={{marginTop:'40px', width:'100%'}} onClick={onBack}>
                Return to Home
            </button>
        </div>
    );

    return (
        <div style={{padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
            <div className="cert-container">
                <div className="cert-header">
                    <h2>Request Certificate</h2>
                </div>

                {step < 4 && (
                    <div className="stepper">
                        <span className={step === 1 ? 'active' : ''}>1. Type</span>
                        <span className={step === 2 ? 'active' : ''}>2. Details</span>
                        <span className={step === 3 ? 'active' : ''}>3. Payment</span>
                        <span className={step === 4 ? 'active' : ''}>4. Status</span>
                    </div>
                )}

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}

                {step < 3 && (
                    <div className="nav-buttons">
                        <button className="secondary-btn" onClick={step === 1 ? onBack : handleBack}>
                            {step === 1 ? 'Cancel' : 'Back'}
                        </button>

                        <button
                            className="primary-btn"
                            disabled={
                                (step === 1 && !selectedType) ||
                                (step === 2 && !fileAttached)
                            }
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <button className="secondary-btn" style={{marginTop:'20px'}} onClick={handleBack}>Back</button>
                )}

            </div>
        </div>
    );
}

export default CertificateRequest;