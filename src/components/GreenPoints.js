import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const GreenPoints = () => {
  const leaderboard = [
    { rank: 1, name: 'John Doe', points: 15250, change: '+2' },
    { rank: 2, name: 'Alice Smith', points: 14800, change: '-1' },
    { rank: 3, name: 'Bob Wilson', points: 14600, change: '+3' },
    // Add more users...
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">Green Points Leaderboard</h3>
      <div className="space-y-4">
        {leaderboard.map((user) => (
          <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                {user.rank === 1 ? <Trophy className="text-yellow-500" /> :
                 user.rank === 2 ? <Medal className="text-gray-400" /> :
                 user.rank === 3 ? <Award className="text-orange-500" /> :
                 user.rank}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.points.toLocaleString()} points</p>
              </div>
            </div>
            <span className={`text-sm ${
              user.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {user.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GreenPoints;