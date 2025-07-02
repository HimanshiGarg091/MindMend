import React, { useState } from "react";
import "./App.css";
import ladyImage from './lady.jpg';
import MoodTracker from "./MoodTracker";
import TherapistForm from "./TherapistForm";
import Modal from "./Modal";
import SelfHelpResources from "./SelfHelpResources";
import CommunityChat from "./CommunityChat";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Footer from "./Footer";
import TherapistList from "./TherapistList";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showMood, setShowMood] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showTherapist, setShowTherapist] = useState(false);
  const [showClientReg, setShowClientReg] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpRole, setSignUpRole] = useState('Client');
  const [showSelfHelp, setShowSelfHelp] = useState(false);
  const [showCommunityChat, setShowCommunityChat] = useState(false);
  const [showTherapists, setShowTherapists] = useState(false);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const openMood = () => setShowMood(true);
  const closeMood = () => setShowMood(false);
  const openSelfHelp = () => setShowSelfHelp(true);
  const closeSelfHelp = () => setShowSelfHelp(false);
  const openCommunityChat = () => setShowCommunityChat(true);
  const closeCommunityChat = () => setShowCommunityChat(false);
  const openTherapists = () => setShowTherapists(true);
  const closeTherapists = () => setShowTherapists(false);

  return (
    <div className="full-width-section">
    {showForm && <TherapistForm onClose={closeForm} />}
    {showMood && <MoodTracker onClose={closeMood} />}
    {showTherapists && (
  <Modal onClose={closeTherapists}>
    <TherapistList />
  </Modal>
)}
    {showSignIn && (
      <Modal onClose={() => setShowSignIn(false)}>
        <SignIn
          onSignIn={() => setShowSignIn(false)}
          onShowSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
          isNewUser={showSignUp}
        />
      </Modal>
    )}
    {showSignUp && (
      <Modal onClose={() => setShowSignUp(false)}>
        <SignUp onSignUp={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }} />
      </Modal>
    )}

      <nav className="navbar">
        <div className="logo">MindMend</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>
            <button className="nav-btn" onClick={openTherapists} style={{ background: "none", border: "none", color: "#16203a", fontSize: "1.1rem", cursor: "pointer" }}>
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
      <Footer />
    </div>

  );
}

export default App;
