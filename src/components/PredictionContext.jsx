import React, { createContext, useState } from 'react'

export const PredictionContext = createContext([{ altitude: "0.00", health_confirmation:"false", lost_confirmation:"false", lost_prediction:"false", pos: "waiting for readings", predicted_health_status: "0.00", timestamp: "1970-01-01 00:00:00" },()=>{}]) 


function PredictionProvider({children}) {
    const[condition, setCondition] = useState({ altitude: "0.00", health_confirmation:"false", lost_confirmation:"false", lost_prediction:"false", pos: "waiting for readings", predicted_health_status: "0.00", timestamp: "1970-01-01 00:00:00" })

  return (
    <PredictionContext.Provider value={[condition, setCondition]}>{children}</PredictionContext.Provider>
  )
}

export default PredictionProvider