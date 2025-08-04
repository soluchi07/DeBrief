//style={{border: '2px solid red'}}

import React from 'react'

export default function PostDetails({post}) {

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="post-meta" >
            <div className="post-info">
              <span className="fandom-tag">{post.fandom}</span>
              {post.spoiler && <span className="spoiler-warning">SPOILER⚠</span>}
            </div>
            <div className="post-episode-info">
              {!post.ismovie && post.season && post.episode && (
                <span className="episode-tag">S{post.season}E{post.episode}</span>
              )}
            </div>
          </div>

          <h1 className="post-title">{post.title}</h1>

          {post.description && 
          <div className="post-description">
            {post.description}
          </div>
          }

          {post.image && (
            <div className="post-image-container">
              <img src={post.image} alt={post.title} className="post-image" />
            </div>
          )}          

          <div className="post-author-date">
            <span className="author">@{post.username}</span>
            <span className="date">{formatDate(post.created_at)}</span>
          </div>
      
    </div>
  )
}
