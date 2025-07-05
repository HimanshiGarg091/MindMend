import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MoodTrackerPage() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchHistory();
    fetchStreak();
  }, []);

  const fetchHistory = async () => {
    const res = await axios.get("/api/mood/history");
    setHistory(res.data);
  };

  const fetchStreak = async () => {
    const res = await axios.get("/api/mood/streak");
    setStreak(res.data.streak);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/mood", { mood, note });
    setMood("");
    setNote("");
    fetchHistory();
    fetchStreak();
  };

  const chartData = {
    labels: history.map((h) => new Date(h.date).toLocaleDateString()),
    datasets: [
      {
        label: "Mood",
        data: history.map((h) => h.moodValue),
        backgroundColor: "#3da9fc",
      },
    ],
  };

  return (
    <div className="mood-tracker-page" style={{ maxWidth: 600, margin: "40px auto", background: "#fff", borderRadius: 12, padding: 32 }}>
      <h2 style={{ color: "#232946" }}>Mood Tracker</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <label>
          <b>How do you feel today?</b>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
            style={{ marginLeft: 12, padding: 8, borderRadius: 6, border: "1px solid #a3d8f4" }}
          >
            <option value="">Select mood</option>
            <option value="5">😊 Great</option>
            <option value="4">🙂 Good</option>
            <option value="3">😐 Okay</option>
            <option value="2">🙁 Bad</option>
            <option value="1">😢 Terrible</option>
          </select>
        </label>
        <br />
        <label>
          <b>Notes:</b>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note"
            style={{ marginLeft: 12, padding: 8, borderRadius: 6, border: "1px solid #a3d8f4", width: "70%" }}
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: 16, background: "#232946", color: "#fff", border: "none", borderRadius: 6, padding: "10px 24px", fontWeight: 600 }}>
          Submit
        </button>
      </form>
      <div>
        <h3 style={{ color: "#232946" }}>Your Mood Streak: {streak} days</h3>
        <Bar data={chartData} />
      </div>
      <div style={{ marginTop: 24 }}>
        <h4 style={{ color: "#232946" }}>Mood History</h4>
        <ul>
          {history.map((h, idx) => (
            <li key={idx}>
              <b>{new Date(h.date).toLocaleDateString()}:</b> {["😢 Terrible", "🙁 Bad", "😐 Okay", "🙂 Good", "😊 Great"][h.moodValue-1]} {h.note && `- ${h.note}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}