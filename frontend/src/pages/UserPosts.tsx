import React, { useEffect, useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, MoreVertical } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setLoading } from '../features/auth/authSlice';

interface Post {
  _id: string;
  email: string;
  comment: string;
  title: string;
  tag: string;
  likes: number;
  createdAt: string;
  userName?: string;
  isCommentOpen?: boolean;
}

const UserPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const referralId = useAppSelector((state) => state.auth.user?.directReferrals);
  const userEmail = user?.email;
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fetch all posts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/all-comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.comments)) {
        setPosts(data.comments);
        console.log("Fetched posts:", data.comments);
      } else {
        setPosts([]);
        console.log("No posts found or invalid data format");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle new post submission
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    const payload = {
      email: userEmail,
      comment: newPost,
      tag: referralId || '',
      title: 'New Post'
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/commenting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Post successful:", data.message);
        setNewPost(''); // Clear the input
        fetchPosts(); // Refresh posts after posting
      } else {
        console.error("Post error:", data.message);
      }
    } catch (error) {
      console.error("Post submission error:", error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    
    const commentText = commentTexts[postId];
    if (!commentText || !commentText.trim()) return;
    
    const payload = {
      postId: postId,       // Correct field name
      userId: user?.id,       // Correct field name
      comment: commentText,
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/comment-on-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log("Comment added:", data.message);
        // Clear just this comment input
        setCommentTexts(prev => ({
          ...prev,
          [postId]: ''
        }));
        fetchPosts(); // Refresh posts after commenting
      } else {
        console.error("Comment error:", data.message);
      }
    } catch (error) {
      console.error("Comment submission error:", error);
    }
  };



  // Handle like action
  const handleLike = async (postId: string) => {
    try {
      const payload = {
        idOfComment: postId,
        email: userEmail
      };

      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/like-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (response.ok) {
  console.log('Like successful:', data.message);
  setPosts(prevPosts =>
    prevPosts.map(post =>
      post._id === postId
        ? { ...post, likes: (post.likes || 0) + 1 } // Assumes likes is a number
        : post
    )
  );
}
 else {
        console.error('Like failed:', data.message);
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  // Toggle comment section for a post
  const toggleCommentSection = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post =>
      post._id === postId ? { ...post, isCommentOpen: !post.isCommentOpen } : post
    )
    );
  };

  // Update comment text for a specific post
  const updateCommentText = (postId: string, text: string) => {
    setCommentTexts(prev => ({
      ...prev,
      [postId]: text
    }));
  };

  // Default avatar for users
  const getAvatar = (email?: string) => {
    if (!email) return "https://ui-avatars.com/api/?name=User&background=random";
    const name = email.split('@')[0];
    return `https://ui-avatars.com/api/?name=${name}&background=random`;
  };

  return (
    <div className="space-y-6 my-8">
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
                disabled={!newPost.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading posts...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
              console.log(post._id)
              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={getAvatar(post.email)} 
                      alt={post.userName || post.email} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {post.userName || (post.email ? post.email.split('@')[0] : 'Unknown User')}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition duration-200">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                {/* Post Title if available */}
                {post.title && post.title !== 'New Post' && (
                  <h4 className="font-medium text-gray-800 mb-2">{post.title}</h4>
                )}

                {/* Post Content */}
                <p className="text-gray-800 whitespace-pre-line">{post.comment}</p>

                {/* Post Actions */}
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => handleLike(post._id)} 
                    className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition duration-200"
                  >
                    <ThumbsUp className={`h-5 w-5 ${post.likes > 0 ? 'text-indigo-600' : ''}`} />
                    <span>{post.likes || 0}</span>
                  </button>
                  <button 
                    onClick={() => toggleCommentSection(post._id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition duration-200"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition duration-200">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comment Input - Only shown when comment section is open */}
                {post.isCommentOpen && (
                  <form onSubmit={(e) => handleCommentSubmit(e, post._id)} className="mt-4">
                    <textarea
                      rows={2}
                      value={commentTexts[post._id] || ''}
                      onChange={(e) => updateCommentText(post._id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Write a comment..."
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!commentTexts[post._id]?.trim()}
                        className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))
        ) : !isLoading && (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No posts yet. Be the first to post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPosts;