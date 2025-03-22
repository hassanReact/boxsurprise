import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, MoreVertical } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

const UserPosts: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  
  // This would come from your API/database
  const posts: Post[] = [
    {
      id: '1',
      content: "Just achieved Gold level status! Thanks to my amazing team for their support and hard work. Here's to reaching new heights together! 🌟",
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        level: "Gold"
      },
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      shares: 3
    },
    {
      id: '2',
      content: "Excited to share my journey in MLM! Here are some tips that helped me succeed:\n\n1. Stay consistent\n2. Build genuine relationships\n3. Focus on providing value\n4. Keep learning and growing",
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        level: "Gold"
      },
      timestamp: "1 day ago",
      likes: 42,
      comments: 8,
      shares: 12
    }
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission
    console.log('New post:', newPost);
    setNewPost('');
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <form onSubmit={handlePostSubmit}>
            <textarea
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Share your thoughts, achievements, or tips..."
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{post.author.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{post.timestamp}</span>
                      <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
                        {post.author.level}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 whitespace-pre-line">{post.content}</p>

              {/* Post Actions */}
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                  <ThumbsUp className="h-5 w-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                  <MessageSquare className="h-5 w-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                  <Share2 className="h-5 w-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;