import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { get, set, ref, child } from "firebase/database";
import { uid } from "uid";

/**
  "BAB1EDBD9E7C": {
    "2023-03-31 08:17:04": {
      "hr": "110.00",
      "prediction": "",
      "pressure": "32.00",
      "spo2": "77.00"
    }
  }

  id: BAB1....
  health: {
    "predict": {
      ...
    },
    ...
  }
*/
function Card({ id, health}) {

  const latitude = health.readings[Object.keys(health.readings).sort((a, b) => (a > b ? -1 : 1))[0]].latitude
  const longitude = health.readings[Object.keys(health.readings).sort((a, b) => (a > b ? -1 : 1))[0]].longitude

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className=" py-4">
        <div className="font-bold text-xl mb-2">{id}</div>
        <p className="text-gray-700 text-base"></p>
      </div>
      <p>
        Heart Rate :{" "}
        {
          health.predict[
            Object.keys(health.predict).sort((a, b) => (a > b ? -1 : 1))[0]
          ].heartrate
        }
      </p>
      <p>  SPO2 :{" "}
        {
          health.predict[
            Object.keys(health.predict).sort((a, b) => (a > b ? -1 : 1))[0]
          ].spo2
        }</p>
      <p>Altitude :{" "}
        {
          health.predict[
            Object.keys(health.predict).sort((a, b) => (a > b ? -1 : 1))[0]
          ].altitude
        }</p>
      <div className="pt-4 flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          view details
        </button>
      </div>
    </div>
  );
}

export default Card;
