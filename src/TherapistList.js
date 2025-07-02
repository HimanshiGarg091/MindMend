import React from "react";
import TherapistCard from "./TherapistCard";
import "./TherapistList.css";

const therapists = [
{
    id: 1,
    name: "Dr. Priya Sharma",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    experience: 8,
    rating: 4.5
},
{
    id: 2,
    name: "Dr. Arjun Mehta",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    experience: 12,
    rating: 5
},
{
    id: 3,
    name: "Dr. Kavita Singh",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    experience: 6,
    rating: 4.2
}
];

const TherapistList = () => (
<div className="therapist-list-container">
    <h2 className="therapist-list-title">Our Therapists</h2>
    {therapists.map(therapist => (
    <TherapistCard key={therapist.id} therapist={therapist} />
    ))}
</div>
);

export default TherapistList;
