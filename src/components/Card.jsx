import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { get, set, ref, child } from "firebase/database";
import { uid } from "uid";
import { useContext } from "react";
import { PositionContext } from "./PositionContext";
import { ConditionContext } from "./ConditionContext";
import { ChipContext, UserContext } from "./ChipContext";
import { PredictionContext } from "./PredictionContext";
import PortalExample from "./PortalExample";


/*
 * @typedef Health { details: { [key: string]: any }, predict: { [key: string]: any }, readings: { [key: string]: any } }
 * @typedef CardParams { id: string, health: Health }
 * @param {CardParams}
 */

function Card({ id, health }) {
  const [currentPosition, setPosition] = useContext(PositionContext)
  const [condition, setCondition] = useContext(ConditionContext)
  const [chipId, setChipId] = useContext(ChipContext)
  const [prediction, setPrediction] = useContext (PredictionContext)


  const latestReading =
    health.readings &&
    health.readings[Object.keys(health.readings).sort((a, b) => (a > b ? -1 : 1))[0]]

  const latestStatus =
    (health.status &&
      health.status[Object.keys(health.status).sort((a, b) => (a > b ? -1 : 1))[0]]) || {
      altitude: "0.00",
      health_status: "Normal",
      heartrate: "0.00",
      spo2: "0.00",
      timestamp: "1970-01-01 00:00:00",
    }
  
  const latestPrediction = 
    (health.predict &&
      health.predict[Object.keys(health.predict).sort((a, b) => (a > b ? -1 : 1))[0]]) || {
      altitude: "0.00",
      health_confirmation:"waiting...",
      lost_confirmation:"waiting...",
      lost_prediction:"false",
      pos: "waiting for data",
      predicted_health_status: "waiting for data",
      timestamp: "1970-01-01 00:00:00",
    }
  

  const cardClass = chipId === id ? 'bg-gray-200' : 'bg-white'

  
  return (
    <div
      className={`max-w-sm p-6 border border-gray-200 rounded-lg shadow cursor-pointer ${cardClass}`}
      onClick={() => {
        setPosition(latestReading ? [latestReading.latitude, latestReading.longitude] : [0, 0]);
        setCondition(latestStatus);
        setChipId(id);
        setPrediction(latestPrediction);
      }}
    >
      <div className="flex flex-col h-full">
        <div className="py-4">
          <div className="font-bold text-xl mb-2">{id}</div>
          <p className="text-gray-700 text-base"></p>
        </div>
        <div className="flex-grow">
          {health.details.name && <p>Current User: {health.details.name}</p>}
          <p>Current Health Status: {latestStatus.health_status}</p>
        </div>
        <div className="flex justify-between">
          <div></div> {/* Empty div for spacing */}
          <button className="bg-blue-700 mt-2 text-white font-bold py-2.5 px-4 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <PortalExample />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card

