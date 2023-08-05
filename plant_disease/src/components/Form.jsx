import React, { useState } from "react";
import { Select } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import axios from "axios";

const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        " https://us-central1-plantdisease-395018.cloudfunctions.net/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const confidencePercentage = (response.data.confidence * 100).toFixed(2);

      // // Create a new object with updated confidence value
      // const updatedPrediction = {
      //   ...response.data,
      //   confidence: confidencePercentage,
      // };
      // console.log(predictions)
      setPrediction(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-blue-300 w-[30%] p-10">
      <Select
        placeholder="Choose Plant"
        data={[
          { value: "Potato", label: "Potato" },
          { value: "Pepper", label: "Pepper" },
          { value: "Tomato", label: "Tomato" },
        ]}
      />
      <Dropzone
        className="h-[100%]"
        onDrop={(file) => {
          setSelectedFile(file[0]);
        }}
      >
        <h1>Upload</h1>
      </Dropzone>
      <button onClick={handleUpload}>Upload</button>
      {predictions && (
        <div className="flex flex-col gap-3">
          <span className="flex justify-between">
            <h3>Status</h3>
            <h3>{predictions.class}</h3>
          </span>
          <span className="flex justify-between">
            <h3>Confidence </h3>
            <h3>{predictions.confidence} %</h3>
          </span>
        </div>
      )}
    </div>
  );
};

export default Form;
