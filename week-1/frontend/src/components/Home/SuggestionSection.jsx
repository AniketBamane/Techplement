import React from 'react';
import { useMyContext } from '../../context/context';
import toast from 'react-hot-toast';

const SuggestionSection = ({ quotes, inside, setFavourites }) => {
  const { token } = useMyContext();

  const addQuoteToFavourites = async (quoteid) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/quote/addquotetofavourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ quote: quoteid }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
      } else {
        toast.success('Quote added to favourites successfully!', {
          duration: 2000,
          style: {
            background: "#4CAF50",
            color: "white",
          },
        });
      }
    } catch (error) {
      toast.error(`Failed to add quote to favourites: ${error.message}`);
    }
  };

  const removeQuoteFromFavourites = async (quoteid) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/quote/removequotetofavourites/${quoteid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
      } else {
        toast.success('Quote removed from favourites successfully!', {
          duration: 2000,
          style: {
            background: "#4CAF50",
            color: "white",
          },
        });
        setFavourites((list) => {
          return list.filter(item => item.quote._id !== quoteid);
        });
      }
    } catch (err) {
      toast.error(`Failed to remove quote from favourites: ${err.message}`);
    }
  };

  if (quotes.length === 0) {
    return <center>{inside === "Quotes" ? "search quotes by author name ." : inside === "Home" ? "Loading quotes ..." : "No quotes available."}</center>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      {quotes.map((quote) => (
        <div key={inside === "favourites" ? quote._id : quote.id} className="bg-gradient-to-br from-green-500 to-green-100 shadow-md rounded-lg p-6 mb-4 flex flex-col sm:flex-row">
          <div className="flex-1 mb-4 sm:mb-0">
            <p className="text-lg md:text-xl font-semibold">{inside === "favourites" ? quote.quote.quote : quote.quote}</p>
          </div>
          <div className="text-right sm:text-left flex flex-col sm:flex-row items-start sm:items-center">
            <p className="text-sm md:text-base italic text-gray-600 mb-2 sm:mb-0 sm:mr-4"> --- {inside === "favourites" ? quote.quote.author : quote.author}</p>
            {inside === "favourites" ? (
              <button className="mt-2 sm:mt-0 bg-white px-2 py-1 rounded-md border hover:border-red-700" onClick={() => {
                removeQuoteFromFavourites(quote.quote._id)
              }}>🗑️</button>
            ) : (
              <button className="mt-2 sm:mt-0 bg-white px-2 py-1 rounded-md border hover:border-green-700" onClick={() => {
                addQuoteToFavourites(quote._id)
              }}>+</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionSection;
