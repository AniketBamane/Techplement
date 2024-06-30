import { createContext, useContext, useEffect, useState } from "react";

const QuoteContext = createContext()

export const ContextProvider = ({children})=>{
  const [token,setToken] = useState(null)
  const getUser = ()=>{
    const storedToken = JSON.parse(localStorage.getItem("Token")) 
    if(storedToken) setToken(storedToken)
  }
const setUser = (token)=>{
  localStorage.setItem("Token",JSON.stringify(token))
  setToken(token)
}
const removeUser = ()=>{
  localStorage.removeItem("Token")
  setToken(null)
}
useEffect(()=>{
  getUser()
},[])
  return (
    <QuoteContext.Provider value={{token,setUser,removeUser}}>
      {children}
    </QuoteContext.Provider>
  )
}

export const  useMyContext = ()=>{
  return useContext(QuoteContext)
}


