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
        
          <h2>{post.title}</h2>
          {post.description &&
          <div className="post-description">{post.description.length < 200? post.description: (post.description.slice(0,128)+ '...') }</div>}
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
          { isCreator &&
              <button onClick={Edit}>Edit📝</button> 
          }
            </Link>
      </div>   
      
    </>
  )
}
