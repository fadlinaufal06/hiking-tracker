import React, { createContext, useState } from 'react'

export const ChipContext = createContext(['']) 

function ChipProvider({children}) {
    const[Chip, setChip] = useState('')

  return (
    <ChipContext.Provider value={[Chip, setChip]}>{children}</ChipContext.Provider>
  )
}

export default ChipProvider