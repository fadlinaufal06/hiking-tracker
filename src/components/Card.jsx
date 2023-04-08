import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { get, set, ref, child } from "firebase/database";
import { uid } from "uid";
import { useContext } from "react";
import { PositionContext } from "./PositionContext";

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
  const [currentPosition, setPosition] = useContext(PositionContext)

  const latestReading=   health.readings[
    Object.keys(health.readings).sort((a, b) => (a > b ? -1 : 1))[0]
  ]

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow" onClick={()=>setPosition([latestReading.latitude, latestReading.longitude])}>
      <div className=" py-4">
        <div className="font-bold text-xl mb-2">{id}</div>
        <p className="text-gray-700 text-base"></p>
      </div>
      <p>
        Current User :{" "}
        {
          health.details[
            Object.keys(health.details).sort((a, b) => (a > b ? -1 : 1))[0]
          ].name
        }
      </p>
      <p>
        Health Status :{" "}
        {
          health.predict[
            Object.keys(health.predict).sort((a, b) => (a > b ? -1 : 1))[0]
          ].health_prediction
        }
      </p>
    </div>
  );
}

export default Card;
