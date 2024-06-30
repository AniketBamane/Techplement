import React, { useEffect, useState } from 'react'
import SuggestionSection from '../components/Home/SuggestionSection'
import { useMyContext } from '../context/context'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'

const Favourites = () => {
  const {token} = useMyContext()
  const [favourites,setFavourites] = useState([])
  const [loading,setLoading] = useState(false)
  const fetchAllFavourites =async () =>{
    console.log(token)
    try{
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/quote/getallfavourites`,{
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          "authorization":`Bearer ${token}`
         },
      })
      const data = await response.json()
      console.log(data)
      if(response.ok){
        setFavourites(data)
      }else{
        toast.error(data.message, {
          duration: 2000,
          style:{
           background:"#FF474C",
           color:"white",
         },
        })
      }
    }catch(err){
      toast.error(err.message, {
        duration: 2000,
        style:{
         background:"#FF474C",
         color:"white",
       },
      })
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    setLoading(true)
    fetchAllFavourites()
  },[])
  if(loading){
    return <Loading />
  }
  return (
    <SuggestionSection quotes={favourites} inside={"favourites"} setFavourites={setFavourites} />
   
  )
}

export default Favourites