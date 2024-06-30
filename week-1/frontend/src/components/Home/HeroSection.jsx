import React, { useState } from 'react';

const HeroSection = () => {
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState({
    quote: 'A Candle never Loses any of its Light while Lighting up another candle.',
    author: 'Rumi',
  });

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();
      const { quote, author } = data;
      setHeroData({ quote, author });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen max-h-96 flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-200 shadow-lg shadow-stone-400 mt-2 rounded-md">
      {loading ? (
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl">Getting new Quote...</h1>
      ) : (
        <div className="text-center text-white p-8">
          <p className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
            {heroData.quote}
          </p>
          <p className="text-md md:text-lg lg:text-xl italic">- {heroData.author}</p>
        </div>
      )}
      <button
        onClick={fetchRandomQuote}
        className="mt-6 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition duration-200"
      >
        Fetch New Quote
      </button>
    </div>
  );
};

export default HeroSection;
