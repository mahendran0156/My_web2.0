import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ImageUpload from "./components/ImageUpload";
import ObjectDetection from "./components/ObjectDetection";
import PredictionResults from "./components/PredictionResults";
import Header from "./components/Header";
import Particles from "./components/Particles";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isObjectDetected, setIsObjectDetected] = useState(false);
  const [predictionResults, setPredictionResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = useCallback((imageFile) => {
    setUploadedImage(imageFile);
    setIsObjectDetected(false);
    setPredictionResults(null);
  }, []);

  const handleObjectDetection = useCallback((isObject) => {
    setIsObjectDetected(isObject);
  }, []);

  const handlePrediction = useCallback((results) => {
    setPredictionResults(results);
    setIsLoading(false);
  }, []);

  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setIsObjectDetected(false);
    setPredictionResults(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="app">
      <Particles />
      <div className="animated-bg"></div>

      <div className="container-fluid">
        <Header />

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="glass-card p-4 mb-4">
              <ImageUpload
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
                onReset={handleReset}
              />
            </div>

            {uploadedImage && (
              <div className="glass-card p-4 mb-4">
                <ObjectDetection
                  image={uploadedImage}
                  onObjectDetected={handleObjectDetection}
                  isObjectDetected={isObjectDetected}
                />
              </div>
            )}

            {isObjectDetected && (
              <div className="glass-card p-4 mb-4">
                <PredictionResults
                  image={uploadedImage}
                  onPrediction={handlePrediction}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  results={predictionResults}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
