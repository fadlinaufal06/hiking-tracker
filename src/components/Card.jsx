import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { get, set, ref, child } from "firebase/database";
import { uid } from "uid";
import { useContext } from "react";
import { PositionContext } from "./PositionContext";
import { ConditionContext } from "./ConditionContext";

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

/*
 * @typedef Health { details: { [key: string]: any }, predict: { [key: string]: any }, readings: { [key: string]: any } }
 * @typedef CardParams { id: string, health: Health }
 * @param {CardParams}
 */


function Card({ id, health}) {
  const [currentPosition, setPosition] = useContext(PositionContext)
  const [condition, setCondition] = useContext(ConditionContext)

  const latestReading=   health.readings && health.readings[
    Object.keys(health.readings).sort((a, b) => (a > b ? -1 : 1))[0]
  ]


  const latestPredict = (health.predict && health.predict[
    Object.keys(health.predict).sort((a, b) => (a > b ? -1 : 1))[0]
  ])??{ altitude: "0.00", health_prediction: "Normal", heartrate: "0.00", spo2: "0.00", timestamp: "1970-01-01 00:00:00" }


  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow" onClick={()=>{
      setPosition(latestReading?[latestReading.latitude, latestReading.longitude]:[0,0])
      setCondition(latestPredict)
      
      }}>
      <div className=" py-4">
        <div className="font-bold text-xl mb-2">{id}</div>
        <p className="text-gray-700 text-base"></p>
      </div>
      <p>
        Current User :{" "}
        {
          health.details.name
        }
      </p>
      <p>
        Health Status :{" "}
        {
          latestPredict.health_prediction
        }
      </p>
    </div>
  );
}

export default Card;
