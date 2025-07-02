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
import Chatbot from "./Chatbot.js";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showMood, setShowMood] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSelfHelp, setShowSelfHelp] = useState(false);
  const [showCommunityChat, setShowCommunityChat] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // Add chatbot state

  // Handler functions
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const openMood = () => setShowMood(true);
  const closeMood = () => setShowMood(false);
  const openSelfHelp = () => setShowSelfHelp(true);
  const closeSelfHelp = () => setShowSelfHelp(false);
  const openCommunityChat = () => setShowCommunityChat(true);
  const closeCommunityChat = () => setShowCommunityChat(false);
  const openChatbot = () => setShowChatbot(true);
  const closeChatbot = () => setShowChatbot(false);

  return (
    <div className="full-width-section">
      {showForm && <TherapistForm onClose={closeForm} />}
      {showMood && <MoodTracker onClose={closeMood} />}
      {showChatbot && <Chatbot onClose={closeChatbot} />} {/* Chatbot rendering */}

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
      app.use('/api/client', require('./routes/client')); // Assuming your route file is named client.js


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
          <p>Connecting you with the support and resources for a healthier mind.</p>
          <button className="get-started-btn" onClick={openChatbot}>Get Started</button> {/* Corrected */}
        </div>
        <div className="hero-image">
          <img src={ladyImage} alt="Mental Wellness Illustration" className="illustration" />
        </div>
      </header>

      <section className="features">
        <h2>Key Features</h2>
        <div className="features-list">

          <div className="feature-item">
            <span role="img" aria-label="Online Therapy" className="icon">💻</span>
            <p>
              <button className="get-started-btn" onClick={openForm}>Online Therapy</button>
            </p>
          </div>

          <div className="feature-item">
            <span role="img" aria-label="Mood Tracking" className="icon">📱</span>
            <p>
              <button className="get-started-btn" onClick={openMood}>Mood Tracking</button>
            </p>
          </div>

          <div className="feature-item">
            <span role="img" aria-label="Self-Help Resources" className="icon">📖</span>
            <p>
              <button className="get-started-btn" onClick={openSelfHelp}>Self-Help Resources</button>
            </p>
            {showSelfHelp && (
              <Modal onClose={closeSelfHelp}>
                <SelfHelpResources />
              </Modal>
            )}
          </div>

          <div className="feature-item">
            <span role="img" aria-label="Community Support" className="icon">👥</span>
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
