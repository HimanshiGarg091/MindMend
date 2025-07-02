import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chatbot({ onClose }) {
    const [messages, setMessages] = useState([
        { sender: "Bot", text: "Hi! How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to bottom on new message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = async () => {
        const userMessage = input.trim();
        if (!userMessage) return;

        setMessages((msgs) => [...msgs, { sender: "You", text: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            const token = localStorage.getItem('token'); // ✅ Get token from storage

            const response = await axios.post(
                'http://localhost:5000/api/chat',
                { message: userMessage },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // ✅ Send token in header
                        'Content-Type': 'application/json'
                    }
                }
            );

            const botReply = response.data.reply;

            setMessages((msgs) => [...msgs, { sender: "Bot", text: botReply }]);
        } catch (error) {
            console.error('Error:', error);

            if (error.response) {
                if (error.response.status === 429) {
                    setMessages((msgs) => [
                        ...msgs,
                        { sender: "Bot", text: "You're sending messages too quickly. Please wait a moment and try again." }
                    ]);
                } else if (error.response.status === 500) {
                    setMessages((msgs) => [
                        ...msgs,
                        { sender: "Bot", text: "Server error. Please try again later." }
                    ]);
                } else {
                    setMessages((msgs) => [
                        ...msgs,
                        { sender: "Bot", text: error.response.data.error || "An error occurred. Please try again." }
                    ]);
                }
            } else {
                setMessages((msgs) => [
                    ...msgs,
                    { sender: "Bot", text: "Network error. Please check your connection." }
                ]);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <div
            id="chatbox"
            style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                width: 300,
                height: 400,
                border: "1px solid #ccc",
                borderRadius: 10,
                background: "white",
                display: "flex",
                flexDirection: "column",
                zIndex: 2000
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "transparent",
                    border: "none",
                    fontSize: 20,
                    cursor: "pointer"
                }}
                aria-label="Close Chatbot"
            >
                ×
            </button>
            <div
                id="messages"
                style={{
                    flex: 1,
                    padding: 10,
                    overflowY: "auto",
                    marginTop: 30
                }}
            >
                {messages.map((msg, idx) => (
                    <p key={idx}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </p>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex" }}>
                <input
                    type="text"
                    id="userInput"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                        width: "80%",
                        padding: 5,
                        border: "none",
                        borderTop: "1px solid #ccc"
                    }}
                    disabled={loading}
                />
                <button
                    style={{
                        width: "20%",
                        border: "none",
                        background: "#007bff",
                        color: "white",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                    onClick={sendMessage}
                    disabled={loading}
                >
                    Send
                </button>
            </div>
            {loading && (
                <div style={{ color: "#888", fontSize: 12, textAlign: "center", marginTop: 8 }}>
                    Loading...
                </div>
            )}
        </div>
    );
}

export default Chatbot;
