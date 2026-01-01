import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function App() {
  const [ward, setWard] = useState(1);
  const [analytics, setAnalytics] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaintWard, setComplaintWard] = useState("");

  /* =========================
     FETCH COMPLAINTS
     ========================= */
     console.log("Fetching complaints...");
  const fetchComplaints = async () => {
    const res = await fetch(`${API_BASE}/complaints`);
    const data = await res.json();
    setComplaints(data);
  };

  /* =========================
     FETCH WARD ANALYTICS
     ========================= */
     
  const fetchWardAnalytics = async (wardNumber) => {
    const res = await fetch(`${API_BASE}/analytics/ward/${wardNumber}`);
    const data = await res.json();
    setAnalytics(data);
  };

  /* =========================
     INITIAL + WARD CHANGE LOAD
     ========================= */
  useEffect(() => {
    fetchComplaints();
    fetchWardAnalytics(ward);
  }, [ward]);

  /* =========================
     SUBMIT COMPLAINT
     ========================= */
  const submitComplaint = async () => {
    await fetch(`${API_BASE}/complaints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        ward: Number(complaintWard),
      }),
    });

    setMessage("✅ Complaint submitted successfully");
    setTitle("");
    setDescription("");
    setComplaintWard("");

    // 🔥 refresh everything
    fetchComplaints();
    fetchWardAnalytics(ward);
  };

  /* =========================
     SAFE VALUES
     ========================= */
  const severity = analytics?.severity_breakdown || {};
  const high = severity.High ?? 0;
  const medium = severity.Medium ?? 0;
  const low = severity.Low ?? 0;
  const riskIndex = analytics?.risk_index ?? 0;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚦 CivicPulse AI</h1>

      {/* WARD SELECT */}
      <label>Select Ward: </label>
      <select value={ward} onChange={(e) => setWard(Number(e.target.value))}>
        {[1,2,3,4,5,6,7,8,9,10].map((w) => (
          <option key={w} value={w}>
            Ward {w}
          </option>
        ))}
      </select>

      <hr />

      {/* ANALYTICS */}
      <h2>📊 Ward Analytics</h2>

      {analytics ? (
        <>
          <p><b>Total Complaints:</b> {analytics.total_complaints}</p>
          <p>🔴 High Severity: {high}</p>
          <p>🟠 Medium Severity: {medium}</p>
          <p>🟢 Low Severity: {low}</p>

          <h3>
            ⚠️ Ward Risk Index:{" "}
            <span style={{ color: "red" }}>{riskIndex}</span>
          </h3>
        </>
      ) : (
        <p>Loading analytics...</p>
      )}

      <hr />

      {/* SUBMIT COMPLAINT */}
      <h2>📢 Submit Complaint</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />

      <input
        placeholder="Ward"
        value={complaintWard}
        onChange={(e) => setComplaintWard(e.target.value)}
      /><br /><br />

      <button onClick={submitComplaint}>Submit</button>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <hr />

      {/* COMPLAINT LIST */}
      <h2>📄 Complaints List</h2>

      {complaints.map((c) => (
        <div key={c.id} style={{ marginBottom: "10px" }}>
          <b>{c.title}</b> — Ward {c.ward}
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
}
