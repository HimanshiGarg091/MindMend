import React from "react";
import "./App.css";
//import "./TherapistForm.css"; // We'll create this CSS file next

function TherapistForm({ onClose, onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    // You can add form validation or submission logic here
        if (onSubmit) onSubmit();
        onClose();
    };

    return (
    <div className="form-popup">
    <form className="form-container" onSubmit={handleSubmit}>
        <h2>Book a Therapist Appointment</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" min="1" required />

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" required />

        <label htmlFor="doctor">Choose Doctor</label>
        <select id="doctor" name="doctor" required>
        <option value="">Select a doctor</option>
        <option value="dr_smith">Dr. Smith</option>
        <option value="dr_jones">Dr. Jones</option>
        <option value="dr_lee">Dr. Lee</option>
        </select>

        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" required />

        <label htmlFor="time">Time Slot</label>
        <input type="time" id="time" name="time" required />

        <button type="submit" className="btn">Book Appointment</button>
        <button type="button" className="btn cancel" onClick={onClose}>Cancel</button>
    </form>
    </div>
);
}

export default TherapistForm;
