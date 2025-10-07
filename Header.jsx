import React from "react";

const Header = () => {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 fw-bold text-white mb-3">
        Autism Spectrum Disorder Prediction
      </h1>
      <p className="lead text-white-50 mb-4">
        Advanced CNN-based analysis using transfer learning for early detection
      </p>
      <div className="glass-card d-inline-block p-3">
        <small className="text-white-75">
          🔬 AI-Powered Medical Analysis • 🧠 Neural Network Detection • 📊
          Confidence Scoring
        </small>
      </div>
    </div>
  );
};

export default Header;
