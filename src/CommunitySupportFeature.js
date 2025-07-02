// src/components/CommunitySupportFeature.js
import React, { useState } from "react";
import CommunityChat from "./CommunityChat";

function CommunitySupportFeature() {
const [open, setOpen] = useState(false);

return (
    <div>
    <button
        style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
        }}
        onClick={() => setOpen(true)}
    >
        <img src="/community-icon.png" alt="Community Support" style={{ width: 48, height: 48 }} />
        <span>Community Support</span>
    </button>

    {open && (
        <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
        }}
        onClick={() => setOpen(false)}
        >
        <div onClick={e => e.stopPropagation()} style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
            <h2>Community Chat</h2>
            <CommunityChat />
            <button onClick={() => setOpen(false)} style={{ marginTop: 16 }}>Close</button>
        </div>
        </div>
    )}
    </div>
);
}

export default CommunitySupportFeature;
