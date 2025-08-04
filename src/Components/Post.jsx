import { useEffect, useState } from 'react'
import { supabase } from '../../client'
import { Link } from "react-router-dom"
  

export default function Post({post}) {
  const [isCreator , setIsCreator] = useState(null)

  useEffect( () => {
    try{
    const fetchUsername = async () =>{
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();


       if (profileError || !profile) {
        setIsCreator(false);
        return;
      }

      setIsCreator(profile?.username === post.username)
      // console.log(profile.username)
      }

    fetchUsername();      
    }catch (error) {
      console.error('Error checking creator status:', error);
      setIsCreator(false);
    }

}, [])

const Edit = (e) => {
  e.stopPropagation();
  e.preventDefault();
  window.location = `/home/edit/${post.id}`

}


  return (
    <>
    {isCreator != null ? 
    
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
            // <Link to={`/home/edit/${post.id}`} onClick={(e) => e.stopPropagation()}>
              <button onClick={Edit}>Edit📝</button> 
            // <Link/>
          }
            </Link>
      </div> :      
      <div className="post-details-overlay">
        <div className="post-details-modal">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading page...</p>
          </div>
        </div>
      </div>
      }
    </>
  )
}
