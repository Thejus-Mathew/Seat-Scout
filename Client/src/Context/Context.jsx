import React, { createContext, useState } from 'react'

export const adminContext = createContext()
export const userContext = createContext()

function Context({children}) {
    const[admin,setAdmin]=useState("")
    const[user,setUser]=useState("")
  return (
    <div>
        <adminContext.Provider value={{admin,setAdmin}}>
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
        </adminContext.Provider>
      
    </div>
  )
}

export default Context
