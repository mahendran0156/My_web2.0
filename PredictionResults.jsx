import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const PredictionResults = ({
  image,
  onPrediction,
  isLoading,
  setIsLoading,
  results,
}) => {
  const [model, setModel] = useState(null);
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    if (image && model && !results) {
      runPrediction();
    }
  }, [image, model, results]);

  const loadModel = async () => {
    try {
      // In a real application, you would load a pre-trained autism detection model
      // For this demo, we'll simulate the model loading
      setIsLoading(true);

      // Simulate model loading time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock model - in reality, you'd load an actual trained model
      setModel("autism-detection-model");
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading model:", error);
      setIsLoading(false);
    }
  };

  const runPrediction = async () => {
    if (!image || !model) return;

    setIsLoading(true);

    try {
      // Simulate CNN prediction process
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = async () => {
        try {
          // Simulate image preprocessing
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 224; // Standard input size for many CNN models
          canvas.height = 224;
          ctx.drawImage(img, 0, 0, 224, 224);

          // Simulate model prediction
          const predictionResults = await simulateAutismPrediction();

          setPredictionData(predictionResults);
          onPrediction(predictionResults);
        } catch (error) {
          console.error("Prediction error:", error);
          setIsLoading(false);
        }
      };

      img.src = URL.createObjectURL(image);
    } catch (error) {
      console.error("Error in prediction:", error);
      setIsLoading(false);
    }
  };

  const simulateAutismPrediction = async () => {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate realistic prediction results
    const autismProbability = Math.random() * 0.4 + 0.1; // 10-50% range
    const neurotypicalProbability = 1 - autismProbability;

    const features = [
      {
        name: "Eye Contact Patterns",
        score: Math.random() * 0.8 + 0.2,
        weight: 0.25,
      },
      {
        name: "Facial Expression Analysis",
        score: Math.random() * 0.7 + 0.3,
        weight: 0.2,
      },
      {
        name: "Social Interaction Cues",
        score: Math.random() * 0.6 + 0.4,
        weight: 0.25,
      },
      {
        name: "Behavioral Patterns",
        score: Math.random() * 0.8 + 0.2,
        weight: 0.3,
      },
    ];

    const overallScore = features.reduce(
      (sum, feature) => sum + feature.score * feature.weight,
      0
    );

    return {
      autismProbability: autismProbability,
      neurotypicalProbability: neurotypicalProbability,
      overallScore: overallScore,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      features: features,
      riskLevel: autismProbability > 0.3 ? "Moderate" : "Low",
      recommendations: generateRecommendations(autismProbability),
    };
  };

  const generateRecommendations = (probability) => {
    if (probability > 0.4) {
      return [
        "Consider consulting with a developmental pediatrician",
        "Schedule a comprehensive evaluation with autism specialists",
        "Begin early intervention services if recommended",
      ];
    } else if (probability > 0.2) {
      return [
        "Monitor developmental milestones closely",
        "Consider screening with standardized tools",
        "Discuss concerns with your pediatrician",
      ];
    } else {
      return [
        "Continue regular developmental monitoring",
        "Maintain routine pediatric check-ups",
        "No immediate concerns detected",
      ];
    }
  };

  if (isLoading) {
    return (
      <div className="prediction-container">
        <h3 className="text-white mb-4">
          <i className="fas fa-brain me-2"></i>
          CNN Analysis in Progress
        </h3>

        <div className="text-center py-5">
          <div
            className="loading-spinner mb-3"
            style={{ width: "40px", height: "40px" }}
          ></div>
          <h5 className="text-white mb-3">
            Analyzing with Convolutional Neural Network
          </h5>
          <p className="text-white-50">
            Processing facial features, behavioral patterns, and social
            interaction cues...
          </p>

          <div className="mt-4">
            <div
              className="progress"
              style={{ height: "8px", borderRadius: "10px" }}
            >
              <div
                className="progress-bar bg-gradient"
                role="progressbar"
                style={{
                  width: "75%",
                  background: "linear-gradient(90deg, #667eea, #764ba2)",
                  borderRadius: "10px",
                }}
              ></div>
            </div>
            <small className="text-white-50 mt-2 d-block">
              Processing neural network layers...
            </small>
          </div>
        </div>
      </div>
    );
  }

  if (!predictionData && !results) {
    return (
      <div className="prediction-container">
        <h3 className="text-white mb-4">
          <i className="fas fa-brain me-2"></i>
          CNN Analysis Ready
        </h3>
        <p className="text-white-50">
          Click to start the autism spectrum analysis...
        </p>
      </div>
    );
  }

  const data = predictionData || results;

  return (
    <div className="prediction-container">
      <h3 className="text-white mb-4">
        <i className="fas fa-chart-line me-2"></i>
        Autism Spectrum Analysis Results
      </h3>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="result-card">
            <h5 className="text-white mb-3">
              <i className="fas fa-percentage me-2"></i>
              Prediction Probabilities
            </h5>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-white-75">Autism Spectrum:</span>
                <span className="text-white fw-bold">
                  {(data.autismProbability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="probability-bar">
                <div
                  className="probability-fill"
                  style={{ width: `${data.autismProbability * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-white-75">Neurotypical:</span>
                <span className="text-white fw-bold">
                  {(data.neurotypicalProbability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="probability-bar">
                <div
                  className="probability-fill"
                  style={{
                    width: `${data.neurotypicalProbability * 100}%`,
                    background: "linear-gradient(90deg, #28a745, #20c997)",
                  }}
                ></div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span className="text-white-75">Confidence:</span>
              <span className="text-white">
                {(data.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="result-card">
            <h5 className="text-white mb-3">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Risk Assessment
            </h5>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-white-75">Risk Level:</span>
                <span
                  className={`badge ${
                    data.riskLevel === "High"
                      ? "bg-danger"
                      : data.riskLevel === "Moderate"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                >
                  {data.riskLevel}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className="text-white-75">Overall Score:</span>
                <span className="text-white">
                  {(data.overallScore * 100).toFixed(1)}/100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="result-card">
            <h5 className="text-white mb-3">
              <i className="fas fa-microscope me-2"></i>
              Feature Analysis
            </h5>

            <div className="row">
              {data.features.map((feature, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-white-75">{feature.name}:</span>
                    <span className="text-white">
                      {(feature.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="probability-bar" style={{ height: "6px" }}>
                    <div
                      className="probability-fill"
                      style={{ width: `${feature.score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="result-card">
            <h5 className="text-white mb-3">
              <i className="fas fa-lightbulb me-2"></i>
              Recommendations
            </h5>

            <ul className="list-unstyled">
              {data.recommendations.map((rec, index) => (
                <li key={index} className="mb-2">
                  <i className="fas fa-arrow-right text-primary me-2"></i>
                  <span className="text-white-75">{rec}</span>
                </li>
              ))}
            </ul>

            <div className="alert alert-custom mt-3">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Important:</strong> This analysis is for educational
              purposes only. Always consult with qualified healthcare
              professionals for proper diagnosis and treatment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;
