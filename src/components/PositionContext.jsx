import React, { createContext, useState } from 'react'

export const PositionContext = createContext([0, 0]) 


function PositionProvider({children}) {
    const[position, setPosition] = useState([-6.875801, 107.614795])

  return (
    <PositionContext.Provider value={[position, setPosition]}>{children}</PositionContext.Provider>
  )
}

export default PositionProvider