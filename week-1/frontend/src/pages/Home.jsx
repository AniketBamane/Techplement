import React, { useEffect, useState } from 'react';
import HeroSection from '../components/Home/HeroSection';
import SuggestionSection from '../components/Home/SuggestionSection';
import toast from 'react-hot-toast';

const Home = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllQuotes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/quote/getallquotes?limit=20`);
      const data = await response.json();
      if (response.ok) {
        setQuotes(data);
      } else {
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
      }
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
        style: {
          background: "#FF474C",
          color: "white",
        },
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllQuotes();
    setLoading(false);
  }, []);

  return (
    <>
      <HeroSection />
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-gray-500 italic my-4 text-2xl text-center sm:text-left">Few more quotes ....</h2>
        {loading ? (
          <center>
            <h2 className="font-bold text-gray-500 italic my-4 text-2xl">Getting quotes...</h2>
          </center>
        ) : (
          <SuggestionSection quotes={quotes} inside="Home" />
        )}
      </div>
    </>
  );
};

export default Home;
