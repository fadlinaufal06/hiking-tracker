import React, { useState, useEffect } from "react";
import { PositionContext } from "./PositionContext";
import { ConditionContext } from "./ConditionContext";
import { set, ref } from "firebase/database";
import { useContext } from "react";
import { db } from "../firebase";
import { ChipContext } from "./ChipContext";
import { PredictionContext } from "./PredictionContext";

function UserPopup({ name }) {
  const [latestStatus] = useContext(ConditionContext);
  const [chipId] = useContext(ChipContext);
  const [prediction, setPrediction] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const [latestPrediction] = useContext(PredictionContext);
  const [confirmationSent, setConfirmationSent] = useState(false);


  const handleClickLost = (event) => {
    if (event) {
      event.preventDefault();
    }

    // Get a reference to the Firebase Realtime Database
    const database = ref(
      db,
      "userdata/" +
        chipId +
        "/predict/" +
        latestStatus.timestamp +
        "/lost_prediction"
    );

    // Add the new user to the Realtime Database
    set(database, "true")
      .then(() => {
        // Clear the form data
        setConfirmationSent(true)
        setTimeout(() => {
          setConfirmationSent(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error adding user to database: ", error);
      });
  };

  // const handleClickPredict = async () => {
    
  //   try {
  //     const response = await fetch(`https://ta-iot.herokuapp.com/predictUserCondition/${chipId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       // Add any body data if required
  //       // body: JSON.stringify({ data: 'example data' })
  //     });
      
  //     // Handle the response here
  //     if (response.ok) {
  //       const dataPredict = await response.json();
  //       console.log("Request successful");
  //       setPrediction(dataPredict);
  //       setPredictionError(null);
  //     } else if (response.status === 400) {
  //       const errorData = await response.json();
  //       setPredictionError(errorData.detail);
  //       setPrediction(null);
  //     } else {
  //       console.error("Request failed");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred", error);
  //   }
  // };


  useEffect(() => {
    setPrediction(null);
    setPredictionError(null)
    setConfirmationSent(false);
  }, [chipId]);





  const predictClass =
    latestStatus.health_status === "fatal" ? "bg-red-600" : "";

  return (
    <div>
      <h1 className="text-lg font-bold mb-2 text-center">{chipId}</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <p>Altitude: {latestStatus.altitude}</p>
          <p>Heart Rate: {latestStatus.heartrate}</p>
        </div>
        <div className="w-full md:w-1/2">
          <p>SPO2: {latestStatus.spo2}</p>
          <p>
            Current Health Status:{" "}
            <span
              className={
                latestStatus.health_status === "Fatal" ? "bg-red-600 text-white" : ""
              }
            >
              {latestStatus.health_status}
            </span>
          </p>
        </div>
      </div>


      <div className="border border-gray-300 rounded-lg shadow-md p-4 my-2">
        <h3 className="text-lg font-bold mb-2 text-center">Prediction</h3>
        <p>Predicted Health Status: {latestPrediction.predicted_health_status}</p>
        <p>Altitude at next pos: {latestPrediction.altitude}</p>
        <p>Position: {latestPrediction.pos}</p>
      </div>

      {/* <button
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2"
        onClick={handleClickPredict}
        >
        Health prediction
        </button>
      {predictionError ? (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 my-3">{predictionError}</div>
      ) : (
        prediction && (
          <div className="border border-gray-300 rounded-lg shadow-md p-4 my-2">
            <h3 className="text-lg font-bold mb-2">Prediction :</h3>
            <p>Predicted Health Status: {prediction.predicted_health_status}</p>
            <p>Altitude at next pos: {prediction.altitude}</p>
            <p>Position: {prediction.pos}</p>
            </div>
            )
          )} */}
          <div className="text-lg font-bold text-center">User Confirmation</div>
          <div className="text-xs text-center">Use this button to ask user condition</div>
          
          <button
            value="true"
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleClickLost}
          >
            Ask for condition confirmation
          </button>
          {confirmationSent && (
            <div className="text-green-600 font-bold mt-2">Confirmation sent</div>
          )}

          <div className="flex mt-2 border border-gray-300 rounded-lg shadow-md">
            <div className="border-r border-gray-300 pr-4">
              <h3 className="m-2 font-bold text-center">Lost Confirmation</h3>
              <p className="text-center">{latestPrediction.lost_confirmation === "false" ? "I am On Track" : "I am Lost" }</p>
            </div>
            <div>
              <h3 className="m-2 font-bold text-center">Health Confirmation</h3>
              <p className="text-center">{latestPrediction.health_confirmation === "false" ? "Normal" : "I Need Help"}</p>
            </div>
          </div>


    </div>
  );
}

export default UserPopup;

