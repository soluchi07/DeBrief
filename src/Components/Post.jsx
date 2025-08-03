import { useEffect, useState } from "react"
import { supabase } from '../../client'
import { Link } from "react-router-dom"
  

export default function Post({post}) {
  return (
    <div className="post-card">
    <Link to={`/home/${post.id}`}>
      <div className="post-metadata">
        <span className="fandom-text">{post.fandom}</span>
        <span className="user-tag">~{post.username}</span>
      </div>
        {/* <p id="fandom-text"></p> */}
        <div className="tags">
          {post.spoiler &&
            // <div id="spoiler">SPOILER⚠️</div>
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
        </Link>
    </div>
  )
}
