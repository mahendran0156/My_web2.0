import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onImageUpload, uploadedImage, onReset }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDrop: (acceptedFiles) => {
      setDragActive(false);
      onDrop(acceptedFiles);
    },
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="image-upload-container">
      <h3 className="text-white mb-4">
        <i className="fas fa-upload me-2"></i>
        Upload Medical Image
      </h3>

      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={`upload-area ${
            isDragActive || dragActive ? "dragover" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="upload-content">
            <i className="fas fa-cloud-upload-alt fa-3x text-white-50 mb-3"></i>
            <h5 className="text-white mb-3">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop an image here"}
            </h5>
            <p className="text-white-50 mb-3">or click to select a file</p>
            <div className="glass-button">
              <i className="fas fa-folder-open me-2"></i>
              Choose File
            </div>
            <div className="mt-3">
              <small className="text-white-50">
                Supported formats: JPEG, PNG, GIF, BMP, WebP (Max 10MB)
              </small>
            </div>
          </div>
        </div>
      ) : (
        <div className="image-preview-container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-white mb-0">
              <i className="fas fa-image me-2"></i>
              Uploaded Image
            </h5>
            <button className="glass-button btn-sm" onClick={onReset}>
              <i className="fas fa-times me-1"></i>
              Remove
            </button>
          </div>

          <div className="text-center">
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded medical image"
              className="image-preview"
            />
            <div className="mt-3">
              <small className="text-white-50">
                File: {uploadedImage.name} (
                {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB)
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
