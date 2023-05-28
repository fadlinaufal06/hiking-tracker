import React, { createContext, useState } from 'react'

export const PositionContext = createContext([0, 0]) 


function PositionProvider({children}) {
    const[position, setPosition] = useState([-7.474418, 110.399760])

  return (
    <PositionContext.Provider value={[position, setPosition]}>{children}</PositionContext.Provider>
  )
}

export default PositionProvider