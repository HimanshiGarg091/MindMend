import React, { useState } from "react";
import "./MoodTracker.css";

const moods = [
{ label: "Sad", icon: "😞" },
{ label: "Crying", icon: "😭" },
{ label: "Normal", icon: "😐" },
{ label: "Happy", icon: "😊" },
];

function MoodTracker({ onClose }) {
const [selectedMood, setSelectedMood] = useState(null);

const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    // You can add logic here to save the mood, etc.
    setTimeout(onClose, 800); // Auto-close after selection (optional)
};

return (
    <div className="mood-popup">
    <div className="mood-container">
        <h2>How are you feeling?</h2>
        <div className="mood-list">
        {moods.map((mood) => (
            <button
            key={mood.label}
            className={`mood-btn${selectedMood === mood.label ? " selected" : ""}`}
            onClick={() => handleMoodSelect(mood.label)}
            >
            <span role="img" aria-label={mood.label}>{mood.icon}</span>
            <div className="mood-label">{mood.label}</div>
            </button>
        ))}
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
    </div>
    </div>
);
}

export default MoodTracker;
