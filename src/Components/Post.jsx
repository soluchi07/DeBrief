import { useEffect, useState } from 'react'
import { supabase } from '../../client'
import { Link } from "react-router-dom"
  

export default function Post({post, isCreator}) {
  

const Edit = (e) => {
  e.stopPropagation();
  e.preventDefault();
  window.location = `/home/edit/${post.id}`

}


  return (
    <>
    
    <div className="post-card">
      <Link to={`/home/${post.id}`}>
        <div className="post-metadata">
          <span className="fandom-text">{post.fandom}</span>
          <span className="user-tag">~{post.username}</span>
        </div>
          <div className="tags">
            {post.spoiler &&
              <span className="spoiler-tag">SPOILER⚠</span>
            }

            {post.season && 
              <div className="tag">Season {post.season}</div>
            }

            {post.episode &&
              <div className="tag">Episode {post.episode}</div>
            }
          </div>
        
          <h2 style={{margin: '5px'}}>{post.title}</h2>
          
          <div className="post-metadata">
            <p style={
              {
              width: 'fit-content',
              borderRadius: '10px',
              color: 'var(--primary)',
              padding: '5px',
              fontSize: '12px',
              border: '1px solid var(--primary)'
              }}
            >
              {post.likes} {post.likes == 1 ? "Like" : "Likes"}
            </p>
            <span className="user-tag">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
                })
              }
            </span>
          </div>
          { isCreator &&
              <button onClick={Edit}>Edit📝</button> 
          }
            </Link>
      </div>   
      
    </>
  )
}
