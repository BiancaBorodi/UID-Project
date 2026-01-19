import React, { useState } from 'react';
import '../styles/PlanStudy.css';

const COURSES_DATA = [
    {
        id: 'UID', name: 'User Interface Design', type: 'Mandatory', credits: 6,
        fixedSlot: { d: 0, t: 0 }
    },
    {
        id: 'DS', name: 'Distributed Systems', type: 'Mandatory', credits: 6,
        fixedSlot: { d: 2, t: 1 }
    },
    {
        id: 'DBD', name: 'Database Design', type: 'Mandatory', credits: 6,
        fixedSlot: { d: 1, t: 3 }
    },
    {
        id: 'TD', name: 'Translator Design', type: 'Mandatory', credits: 6,
        fixedSlot: { d: 3, t: 4 }
    },
    {
        id: 'PM', name: 'Project Management', type: 'Optional', credits: 4,
        availableSlots: [{ d: 4, t: 0 }, { d: 4, t: 1 }, { d: 0, t: 0 }]
    },
    {
        id: 'PPD', name: 'Personal Prof. Dev', type: 'Optional', credits: 4,
        availableSlots: [{ d: 4, t: 2 }, { d: 3, t: 2 }, { d: 2, t: 1 }]
    },
    {
        id: 'MC', name: 'Mgmt & Communication', type: 'Optional', credits: 4,
        availableSlots: [{ d: 3, t: 1 }, { d: 2, t: 3 }, { d: 1, t: 3 }]
    },
    {
        id: 'MK', name: 'Marketing', type: 'Optional', credits: 4,
        availableSlots: [{ d: 0, t: 3 }, { d: 1, t: 4 }, { d: 3, t: 4 }]
    }
];

function PlanStudy({ onBack }) {
    const [step, setStep] = useState(1);
    const [selectedCourses, setSelectedCourses] = useState(['UID', 'DS', 'DBD', 'TD']);
    const [placements, setPlacements] = useState({});
    const [activeCourseId, setActiveCourseId] = useState(null);

    const totalCredits = COURSES_DATA
        .filter(c => selectedCourses.includes(c.id))
        .reduce((sum, c) => sum + c.credits, 0);

    const isCreditsValid = totalCredits >= 30;

    const toggleCourseSelection = (id) => {
        if (selectedCourses.includes(id)) {
            setSelectedCourses(selectedCourses.filter(c => c !== id));
            const newPlacements = {...placements};
            delete newPlacements[id];
            setPlacements(newPlacements);
            if (activeCourseId === id) setActiveCourseId(null);
        } else {
            setSelectedCourses([...selectedCourses, id]);
        }
    };

    const handlePlaceCourse = (day, time) => {
        if (!activeCourseId) return;

        const course = COURSES_DATA.find(c => c.id === activeCourseId);
        const isAllowed = course.availableSlots.some(s => s.d === day && s.t === time);

        if (isAllowed) {
            setPlacements({
                ...placements,
                [activeCourseId]: { day, time }
            });
        }
    };

    const getCoursesInSlot = (day, time) => {
        const coursesInSlot = [];
        COURSES_DATA.forEach(c => {
            if (c.type === 'Mandatory' && c.fixedSlot.d === day && c.fixedSlot.t === time) {
                coursesInSlot.push(c.id);
            }
        });
        Object.keys(placements).forEach(id => {
            const p = placements[id];
            if (p.day === day && p.time === time) {
                coursesInSlot.push(id);
            }
        });
        return coursesInSlot;
    };

    const allOptionalsPlaced = selectedCourses
        .filter(id => {
            const c = COURSES_DATA.find(course => course.id === id);
            return c.type === 'Optional';
        })
        .every(id => placements[id]);

    const hasAnyConflict = (() => {
        const occupiedSlots = [];
        COURSES_DATA.filter(c => c.type === 'Mandatory').forEach(c => {
            occupiedSlots.push(`${c.fixedSlot.d}-${c.fixedSlot.t}`);
        });
        Object.keys(placements).forEach(id => {
            const p = placements[id];
            occupiedSlots.push(`${p.day}-${p.time}`);
        });
        const uniqueSlots = new Set(occupiedSlots);
        return uniqueSlots.size !== occupiedSlots.length;
    })();

    const renderStep1 = () => (
        <div>
            <h3>1. Select Optional Courses</h3>
            <p>Mandatory courses (24 ECTS) are fixed. You must reach at least <strong>30 ECTS</strong> to proceed.</p>

            {COURSES_DATA.map(course => (
                <div key={course.id} className={`course-item ${course.type === 'Mandatory' ? 'mandatory' : ''}`}>
                    <label style={{display: 'flex', alignItems: 'center', width: '100%', cursor: course.type === 'Optional' ? 'pointer' : 'default'}}>
                        <input
                            type="checkbox"
                            checked={selectedCourses.includes(course.id)}
                            onChange={() => toggleCourseSelection(course.id)}
                            disabled={course.type === 'Mandatory'}
                            style={{marginRight: '10px'}}
                        />
                        <span>{course.name} ({course.credits} ECTS)</span>
                        {course.type === 'Mandatory' && <span style={{marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 'bold'}}>REQ</span>}
                    </label>
                </div>
            ))}

            <div style={{
                textAlign:'right',
                marginTop:'20px',
                padding: '10px',
                background: isCreditsValid ? '#d4edda' : '#f8d7da',
                color: isCreditsValid ? '#155724' : '#721c24',
                border: `1px solid ${isCreditsValid ? '#c3e6cb' : '#f5c6cb'}`,
                borderRadius: '4px',
                fontWeight: 'bold'
            }}>
                Total Credits: {totalCredits} / 30 ECTS
                {!isCreditsValid && <div style={{fontWeight:'normal', fontSize:'0.9rem'}}>Please select more optional courses.</div>}
            </div>
        </div>
    );

    const renderCalendar = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
        const activeCourseObj = COURSES_DATA.find(c => c.id === activeCourseId);

        return (
            <div className="calendar-wrapper">
                <div className="calendar-header">
                    <div>Time</div>
                    {days.map(d => <div key={d}>{d}</div>)}
                </div>

                <div className="calendar-body">
                    {times.map((timeLabel, timeIndex) => (
                        <div key={timeIndex} className="calendar-row">
                            <div className="time-label">{timeLabel}</div>
                            {days.map((day, dayIndex) => {
                                let isAvailableOption = false;
                                if (activeCourseObj && activeCourseObj.type === 'Optional') {
                                    isAvailableOption = activeCourseObj.availableSlots.some(s => s.d === dayIndex && s.t === timeIndex);
                                }
                                const coursesHere = getCoursesInSlot(dayIndex, timeIndex);
                                const isConflict = coursesHere.length > 1;

                                return (
                                    <div
                                        key={dayIndex}
                                        className={`calendar-cell ${isAvailableOption ? 'is-available' : ''}`}
                                        onClick={() => handlePlaceCourse(dayIndex, timeIndex)}
                                    >
                                        {coursesHere.map(pid => {
                                            const cObj = COURSES_DATA.find(c => c.id === pid);
                                            const isMandatory = cObj.type === 'Mandatory';
                                            return (
                                                <div
                                                    key={pid}
                                                    className={`placed-course-block ${isMandatory ? 'mandatory' : 'optional'} ${isConflict ? 'conflict' : ''}`}
                                                >
                                                    {pid}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderStep2 = () => (
        <div>
            <h3>2. Plan Your Schedule</h3>
            <p>Place your optional courses in the calendar.</p>

            <div className="course-chips-container">
                {selectedCourses
                    .filter(id => COURSES_DATA.find(c => c.id === id).type === 'Optional')
                    .map(id => {
                        const isPlaced = !!placements[id];
                        const isActive = activeCourseId === id;
                        return (
                            <div
                                key={id}
                                className={`course-chip ${isActive ? 'active' : ''} ${isPlaced ? 'placed' : ''}`}
                                onClick={() => setActiveCourseId(id)}
                            >
                                {id}
                                {isPlaced && <span>✓</span>}
                            </div>
                        );
                    })}
            </div>

            {hasAnyConflict && (
                <div style={{color: 'var(--error-red)', fontWeight: 'bold', marginBottom: '10px', textAlign:'center'}}>
                    ⚠️ Conflict Detected!
                </div>
            )}

            {renderCalendar()}
        </div>
    );

    const renderStep3 = () => {
        return (
            <div>
                <h3>3. Confirmation</h3>
                <div style={{marginBottom: '20px', border: '1px solid #ccc', padding: '15px'}}>
                    <p><strong>Total ECTS:</strong> {totalCredits} / 30</p>
                    <p><strong>Status:</strong> <span style={{color:'green', fontWeight:'bold'}}> Valid Plan</span></p>
                </div>
                <h4>Final Schedule:</h4>
                <ul style={{listStyle:'none', padding:0}}>
                    {selectedCourses.map(id => {
                        const cObj = COURSES_DATA.find(c => c.id === id);
                        let dayIndex, timeIndex;

                        if(cObj.type === 'Mandatory') {
                            dayIndex = cObj.fixedSlot.d;
                            timeIndex = cObj.fixedSlot.t;
                        } else {
                            if(!placements[id]) return null;
                            dayIndex = placements[id].day;
                            timeIndex = placements[id].time;
                        }

                        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
                        const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

                        return (
                            <li key={id} style={{marginBottom:'10px', paddingBottom:'10px', borderBottom:'1px solid #eee'}}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <strong>{cObj.name} ({id})</strong>
                                    <span style={{fontSize:'0.9rem', color: cObj.type==='Mandatory'?'#666':'green'}}>
                                        {cObj.credits} ECTS
                                    </span>
                                </div>
                                {days[dayIndex]} at {times[timeIndex]}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    const renderSuccess = () => (
        <div className="success-message" style={{textAlign:'center', padding:'40px'}}>
            <div style={{fontSize: '4rem', color:'green'}}>✓</div>
            <h2>Plan Saved Successfully!</h2>
            <p>Your study plan for next term has been submitted.</p>
            <br />
            <button className="primary-btn" onClick={onBack}>Return to Dashboard</button>
        </div>
    );

    return (
        <div style={{padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
            <div className="plan-container">
                <div className="plan-header">
                    <h2>Plan Your Study</h2>
                </div>

                {step < 4 && (
                    <div className="progress-bar">
                        <span className={`step-indicator ${step === 1 ? 'active' : ''}`}>1. Select</span>
                        <span className={`step-indicator ${step === 2 ? 'active' : ''}`}>2. Schedule</span>
                        <span className={`step-indicator ${step === 3 ? 'active' : ''}`}>3. Confirm</span>
                    </div>
                )}

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderSuccess()}
                {step < 4 && (
                    <div className="nav-buttons">
                        {step === 1 ? (
                            <button className="secondary-btn" onClick={onBack}>Cancel</button>
                        ) : (
                            <button className="secondary-btn" onClick={() => setStep(step - 1)}>Back</button>
                        )}

                        <button
                            className="primary-btn"
                            disabled={
                                (step === 1 && !isCreditsValid) ||
                                (step === 2 && (!allOptionalsPlaced || hasAnyConflict))
                            }
                            onClick={() => setStep(step + 1)}
                        >
                            {step === 3 ? "Submit Plan" : "Next"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlanStudy;