import React, { useState } from 'react';
import Articles from '../components/Articles';
import FAQ from '../components/FAQ';
import FarmerEducation from '../components/FarmerEducation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import { BsChatDots } from 'react-icons/bs'; // Using react-icons for a chat icon

const Home = () => {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotVisible(!isChatBotVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Articles />
        <FarmerEducation />
        <FAQ />
      </main>
      <Footer />

      {/* Chatbot Icon */}
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={toggleChatBot}
        aria-label="Toggle ChatBot"
      >
        <BsChatDots size={24} />
      </button>

      {/* ChatBot Component */}
      {isChatBotVisible && (
        <div className="fixed bottom-16 right-6 bg-white shadow-lg rounded-xl p-4 w-80 h-96 overflow-y-auto">
          <ChatBot />
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={toggleChatBot}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
