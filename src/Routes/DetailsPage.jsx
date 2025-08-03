import React, { useState, useEffect } from 'react';
// import './PostDetails.css';
import { useParams } from 'react-router-dom';
import { supabase } from '../../client';
import PostDetails from '../Components/PostDetails';
import PostActions from '../Components/PostActions';
import CommentForm from '../Components/CommentForm';
import CommentList from '../Components/CommentList';

//style={{border: '2px solid red'}}

function DetailsPage() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {id} = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const { data } = await supabase
      .from('Posts')
      .select()
      .eq('id', id)

      setPost(data[0])
        
      setComments(data[0].comments);
        
      setIsLoading(false);
    }

    fetchPost();
  }, []);
  

  if (isLoading) {
    return (
      <div className="post-details-overlay">
        <div className="post-details-modal">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-details-overlay">
        <div className="post-details-modal">
          <div className="error-message">
            <h3>Post not found</h3>
            <button onClick={onClose} className="close-button">Close</button>
          </div>
        </div>
      </div>
    );
  }

  const onClose = () => {
    window.location = '/home'
  }

//Big return statement

  return (
      <div className="post-details-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="post-details-header">
          <button onClick={onClose} className="close-button" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Post content */}
        <div className="post-details-content" >
          <PostDetails post={post}/>
          
          {/* Actions */}
          <PostActions post={post} setPost={setPost} id={id}/>
          

          {/* Comments Section */}
          <div className="comments-section" >
            <h3 className="comments-title">
              Comments ({comments.length})
            </h3>

            {/* Comment form */}
            <CommentForm id={id} comments={comments} setComments={setComments}/>

            {/* Comments list */}
            <CommentList comments={comments}/>
          </div>
        </div>
      </div>
  );
};

export default DetailsPage;