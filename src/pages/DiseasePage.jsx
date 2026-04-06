import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DiseasePage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setResult(null);
    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setFile(null);
      setError("Please upload a valid image file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Upload image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Disease analysis failed. Please check if the backend is running.");
      }

      const data = await res.json();
      setResult(data);
    } catch (fetchError) {
      setResult(null);
      setError(fetchError.message || "Something went wrong while analyzing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          AI Disease Detection
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: "15px" }}
        />

        {previewUrl && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={previewUrl}
              alt="Selected crop"
              style={{
                width: "100%",
                maxHeight: "280px",
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid #d9e8db",
              }}
            />
            <p style={{ marginTop: "8px", color: "#4b5563", fontSize: "14px" }}>
              Selected image: {file?.name}
            </p>
          </div>
        )}

        {error && (
          <p style={{ marginBottom: "15px", color: "#c62828", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading ? "#81c784" : "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Plant"}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: "25px",
              padding: "20px",
              background: "#f1f8f4",
              borderRadius: "12px",
            }}
          >
            <h3>Disease: {result.disease}</h3>
            <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
            <p>Weather: {result.weather}</p>

            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                background: "#e8f5e9",
                borderRadius: "10px",
              }}
            >
              <h4>Smart Advice</h4>
              <p>{result.advice}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
