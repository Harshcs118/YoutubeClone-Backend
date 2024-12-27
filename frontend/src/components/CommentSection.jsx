import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CommentSection = ({ videoId }) => {
  const { isLoggedIn, user } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      text: comment,
      user: user.username,
      timestamp: new Date().toISOString(),
    };
    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleEditComment = (id, newText) => {
    setComments(comments.map(c => 
      c.id === id ? { ...c, text: newText } : c
    ));
    setEditing(null);
  };

  const handleDeleteComment = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(comments.filter(c => c.id !== id));
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {isLoggedIn ? (
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Comment
          </button>
        </div>
      ) : (
        <p className="text-gray-600 mb-4">Please sign in to comment</p>
      )}

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="p-4 bg-gray-50 rounded-lg shadow">
            {editing === comment.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue={comment.text}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleEditComment(comment.id, e.target.value);
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{comment.user}</p>
                  {comment.user === user?.username && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditing(comment.id)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-gray-800">{comment.text}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
