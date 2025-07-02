import React from "react";
import "./TherapistCard.css";

const TherapistCard = ({ therapist }) => (
<div className="therapist-card">
    <img
    src={therapist.photo}
    alt={therapist.name}
    className="therapist-photo"
    />
    <div className="therapist-info">
    <h3>{therapist.name}</h3>
    <p>{therapist.experience} years experience</p>
    <div className="therapist-stars">
        {Array.from({ length: 5 }, (_, i) => (
        <span
            key={i}
            style={{
            color: i < Math.round(therapist.rating) ? "#ffd700" : "#ddd",
            fontSize: "22px"
            }}
        >
            ★
        </span>
        ))}
    </div>
    </div>
</div>
);

export default TherapistCard;
