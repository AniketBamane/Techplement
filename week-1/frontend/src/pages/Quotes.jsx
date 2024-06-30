import React , {useState} from 'react'
import SuggestionSection from '../components/Home/SuggestionSection';
import { useDebouncedCallback } from 'use-debounce';
import toast from 'react-hot-toast';

const Quotes = () => {
  const [authorName, setAuthorName] = useState('');
  const [quotes, setQuotes] = useState([]);


  
  const searchQuotes = useDebouncedCallback(async()=>{
    try{
      const response = await fetch(authorName === "" ? `${import.meta.env.VITE_BASE_URL}/api/quote/getallquotes?limit=20&page=2` :`${import.meta.env.VITE_BASE_URL}/api/quote/searchquote?search=${authorName}`)
      const data = await response.json()
      if(!response.ok){
        toast.error(data.message, {
          duration: 2000,
          style:{
           background:"#FF474C",
           color:"white",
         },
        })
        setQuotes([])
      }else{
        setQuotes(data)
      }
     }catch(err){
      toast.error(err.message, {
        duration: 2000,
        style:{
         background:"#FF474C",
         color:"white",
       },
      })
      setAuthorName('');
      setQuotes([]);
     }
  },300)

  const handleInputChange = (event) => {
    setAuthorName(event.target.value);
    searchQuotes();
  };

  return (
    <>
    <div className="flex items-center space-x-4 w-full">
      <input
        type="text"
        placeholder="Search by author name..."
        className="py-2 px-4 flex-grow border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        value={authorName}
        onChange={handleInputChange}
      />
    </div>
    <SuggestionSection  quotes={quotes} inside={"Quotes"} />
    </>
  )
}

export default Quotes