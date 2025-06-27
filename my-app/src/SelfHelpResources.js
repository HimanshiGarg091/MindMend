import React from "react";
import "./SelfHelpResources.css";
import Book from './Book.png';
import Exercise from'./Exercise.png';
import events from './Funny Events.png';

const resources = [
{
    label: "Books",
    img: Book,
    link: "https://www.goodreads.com/shelf/show/self-help"
},
{
    label: "Exercise",
    img:Exercise,
    link: "https://www.youtube.com/results?search_query=exercise+for+depression"
},
{
    label: "Happy Events",
    img: events,
    link: "https://www.youtube.com/results?search_query=happy+moments"
}
];

const SelfHelpResources = () => (
<div className="SelfHelp-container">
    <h1>Self-Help</h1>
    <p>Browse through resources for self-help in coping with depression.</p>
    <div className="SelfHelp-resources">
    {resources.map((res) => (
        <button
        key={res.label}
        className="SelfHelp-card"
        onClick={() => window.open(res.link, "_blank")}
        >
        <img src={res.img} alt={res.label} className="SelfHelp-icon" />
        <span className="SelfHelp-label">{res.label}</span>
        
        </button>
    ))}
    </div>
</div>
);

export default SelfHelpResources;
