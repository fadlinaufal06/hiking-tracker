import React, { useState } from "react";
import { PositionContext } from "./PositionContext";
import { ConditionContext } from "./ConditionContext";
import { set, ref } from "firebase/database";
import { useContext } from "react";
import { db } from "../firebase";
import { ChipContext } from "./ChipContext";

function UserPopup({ name }) {
  const [latestPredict] = useContext(ConditionContext);
  const [chipId] = useContext(ChipContext);

  const handleClick = (event) => {
    event.preventDefault();

    // Get a reference to the Firebase Realtime Database
    const database = ref(
      db,
      "userdata/" +
        chipId +
        "/predict/" +
        latestPredict.timestamp +
        "/lost_prediction"
    );

    // Add the new user to the Realtime Database
    set(database, "true")
      .then(() => {
        // Clear the form data
      })
      .catch((error) => {
        console.error("Error adding user to database: ", error);
      });
  };

  const predictClass =
    latestPredict.health_prediction === "fatal" ? "bg-red-600" : "";

  return (
    <div className={predictClass}>
      <h1 className="font-bold">{chipId}</h1>
      <p>Altitude: {latestPredict.altitude}</p>
      <p>Heart Rate: {latestPredict.heartrate}</p>
      <p>SPO2: {latestPredict.spo2}</p>
      <h2>
        Health Prediction:{" "}
        <span
          className={
            latestPredict.health_prediction === "Fatal"
              ? "bg-red-600 text-white"
              : ""
          }
        >
          {latestPredict.health_prediction}
        </span>
      </h2>
      <button
        value="true"
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={handleClick}
      >
        Lost confirmation
      </button>
    </div>
  );
}

export default UserPopup;
