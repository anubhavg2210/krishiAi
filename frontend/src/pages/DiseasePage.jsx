import { motion } from "framer-motion";
import { useState } from "react";

export default function DiseasePage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return alert("Upload image first!");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>

      <div style={{
        width: "100%",
        maxWidth: "600px",
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          🌿 AI Disease Detection
        </h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "15px" }}
        />

        <button
          onClick={handleAnalyze}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Analyze Plant 🌱
        </button>

        {result && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      marginTop: "25px",
      padding: "20px",
      background: "#f1f8f4",
      borderRadius: "12px"
    }}
  >

            <h3>🌿 Disease: {result.disease}</h3>
            <p>📊 Confidence: {(result.confidence * 100).toFixed(2)}%</p>
            <p>🌤 Weather: {result.weather}</p>

            <div style={{
              marginTop: "15px",
              padding: "15px",
              background: "#e8f5e9",
              borderRadius: "10px"
            }}>
              <h4>🌾 Smart Advice</h4>
              <p>{result.advice}</p>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}