import React from 'react';
import { Timer, Trophy, Zap } from 'lucide-react';

const Challenges = () => {
  const challenges = [
    {
      title: 'Energy Saver',
      description: 'Reduce energy consumption by 20%',
      points: 500,
      progress: 65,
      daysLeft: 5
    },
    {
      title: 'Green Warrior',
      description: 'Complete 10 eco-friendly tasks',
      points: 300,
      progress: 40,
      daysLeft: 12
    }
    // Add more challenges...
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">Active Challenges</h3>
      <div className="space-y-6">
        {challenges.map((challenge, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold">{challenge.title}</h4>
                <p className="text-sm text-gray-600">{challenge.description}</p>
              </div>
              <div className="flex items-center text-green-600">
                <Trophy size={16} />
                <span className="ml-1">{challenge.points} pts</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 rounded-full h-2" 
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{challenge.progress}% complete</span>
                <div className="flex items-center">
                  <Timer size={14} />
                  <span className="ml-1">{challenge.daysLeft} days left</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Challenges;