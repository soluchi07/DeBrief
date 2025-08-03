import { useState } from 'react';
import { supabase } from '../../client';

export default function PostActions({post, setPost, id}) {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async () => {
    // Toggle like status
    console.log(post.likes + 1)
    if (!isLiked){
      setIsLiked(true)
      await supabase
      .from('Posts')
      .update({likes: post.likes + 1})
      .eq('id', id)

      setPost(prev => ({
        ...prev,
        likes: prev.likes + 1
      }));
      
    } else{
      setIsLiked(false)
      handleDislike();     
    }

    
    ;
  };

  const handleDislike = async () => {
    await supabase
      .from('Posts')
      .update({likes: post.likes - 1})
      .eq('id', id)

      setPost(prev => ({
      ...prev,
      likes: prev.likes - 1
    }));
  }

  return (
    <div className="post-actions">
            <button
              onClick={handleLike} 
              className={`action-button like-button ${isLiked ? 'liked' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
            </button>
            
            <button className="action-button share-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>Share</span>
            </button>
    </div>
  )
}
