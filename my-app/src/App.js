import React, { useState } from "react";
import "./App.css";
import ladyImage from './lady.jpg';
import MoodTracker from "./MoodTracker";


import TherapistForm from "./TherapistForm";


function App() {
  const [showForm, setShowForm] = useState(false);
  const [showMood, setShowMood] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showTherapistReg, setShowTherapistReg] = useState(false);
  const [showClientReg, setShowClientReg] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpRole, setSignUpRole] = useState('Client');

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const openMood = () => setShowMood(true);
  const closeMood = () => setShowMood(false);

  return (
    <div className="full-width-section">z
    {showForm && <TherapistForm onClose={closeForm} />}
    {showMood && <MoodTracker onClose={closeMood} />}

      <nav className="navbar">
        <div className="logo">MindMend</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>
            <button className="nav-btn" onClick={openForm} style={{ background: "none", border: "none", color: "#16203a", fontSize: "1.1rem", cursor: "pointer" }}>
              Therapists
            </button>
          </li>
          <li>Resources</li>
          <li>Community</li>
        </ul>
        <button className="sign-in-btn" onClick={() => setShowSignIn(true)}>Sign in</button>
      </nav>
      <header className="hero">
        <div className="hero-text">
          <h1>Nurturing Mental Wellness</h1>
          <p>
            Connecting you with the support and resources for a healthier mind.
          </p>
          <button className="get-started-btn">Get Started</button>
        </div>
        <div className="hero-image">
          {}
          <img
            src={ladyImage}
            alt="Mental Wellness Illustration"
            className="illustration"
          />
        </div>
      </header>
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <span role="img" aria-label="Online Therapy" className="icon">
              💻
            </span>
            <p> <button className="get-started-btn" onClick={openForm}>Online Therapy</button></p>
          </div>
          <div className="feature-item">
            <span role="img" aria-label="Mood Tracking" className="icon">
              📱
            </span>
            <p><button className="get-started-btn" onClick={openMood}>
  Mood Tracking
</button></p>
          </div>

          <div className="feature-item">
  <span role="img" aria-label="Self-Help Resources" className="icon">
    📖
  </span>
  <p>
    <button className="get-started-btn" onClick={openSelfHelp}>
      Self-Help Resources
    </button>
  </p>
  {showSelfHelp && (
    <Modal onClose={closeSelfHelp}>
      <SelfHelpResources />
    </Modal>
  )}
    
</div>



<div className="feature-item">
  <span role="img" aria-label="Community Support" className="icon">
    👥
  </span>
  <button
    className="get-started-btn"
    onClick={openCommunityChat}
    style={{ marginTop: "10px" }}
  >
    Community Support
  </button>
  {showCommunityChat && (
    <Modal onClose={closeCommunityChat}>
      <h2>Community Chat</h2>
      <CommunityChat />
    </Modal>
  )}
</div>

        </div>
      </section>
    </div>

  );
}

export default App;
