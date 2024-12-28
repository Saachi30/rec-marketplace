import React from 'react'
import { Heart, MessageCircle } from 'lucide-react';
const Community = () => {
    const posts = [
      {
        user: "John D.",
        content: "Just installed solar panels! Excited to join the green energy movement.",
        likes: 24,
        comments: 5
      }
      // More posts...
    ];
  
    return (
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">Community Feed</h3>
        <div className="space-y-4">
          {posts.map((post, i) => (
            <div key={i} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full" />
                <span className="font-bold">{post.user}</span>
              </div>
              <p className="mb-2">{post.content}</p>
              <div className="flex gap-4 text-gray-500">
                <button className="flex items-center gap-1">
                  <Heart size={16} /> {post.likes}
                </button>
                <button className="flex items-center gap-1">
                  <MessageCircle size={16} /> {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default Community
