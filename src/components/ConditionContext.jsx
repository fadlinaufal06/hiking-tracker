import React, { createContext, useState } from 'react'

export const ConditionContext = createContext([{ altitude: "0.00", health_status: "Normal", heartrate: "0.00", spo2: "0.00", timestamp: "1970-01-01 00:00:00" },()=>{}]) 


function ConditionProvider({children}) {
    const[condition, setCondition] = useState({ altitude: "0.00", health_status: "waiting for readings", heartrate: "0.00", spo2: "0.00", timestamp: "1970-01-01 00:00:00" })

  return (
    <ConditionContext.Provider value={[condition, setCondition]}>{children}</ConditionContext.Provider>
  )
}

export default ConditionProvider