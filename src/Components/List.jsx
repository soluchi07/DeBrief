import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../client'
import Post from './Post'
import { Link } from 'react-router-dom'
import HomeUtilities from './HomeUtilities'

export default function List({ searchTerm, sortBy, hideSpoilers }) {
    const [posts, setPosts] = useState([])
    const [authUsername, setAuthUserName] = useState('')
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);

    const handleSearch = (term) => {
        setSearchTerm(term);
        // You can pass this to your List component or handle the filtering logic here
    };

    const handleSortChange = (sortOption) => {
        setSortBy(sortOption);
        // You can pass this to your List component to sort the posts
    };

    const handleSpoilerFilter = (hide) => {
        setHideSpoilers(hide);
        // You can pass this to your List component to filter out spoiler posts
    };

    

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const { data } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: false })
            //TODO add sort on top that ONLY sorts by time. pass the sort prop here and use it as the ascending value
            
            setPosts(data)

            const { data: { user } } = await supabase.auth.getUser();
            const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single(); 
            setAuthUserName(profile.username)  
            
            if (profileError || !profile) {
                console.error(profileError);
            } 
             setLoading(false);
        }

        fetchPost();
    }, [])

   // Memoized filtered and sorted posts
  const processedPosts = useMemo(() => {
    let filtered = [...posts];

    // 1. Filter by search term (title)
    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    // 2. Filter out spoilers if enabled
    if (hideSpoilers) {
      filtered = filtered.filter(post => !post.spoiler);
    }

    // 3. Sort posts
    filtered.sort((a, b) => {
      if (sortBy === 'likes') {
        // Sort by likes (descending - most liked first)
        const likesA = a.likes || 0;
        const likesB = b.likes || 0;
        return likesB - likesA;
      } else {
        // Sort by created_at (descending - newest first)
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      }
    });

    return filtered;
  }, [posts, searchTerm, sortBy, hideSpoilers]);

  if (loading) {
    return (
      <div className="list-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-container">
        <div className="error">Error loading posts: {error}</div>
      </div>
    );
  }

  if (processedPosts.length === 0) {
    return (
      <div className="list-container">
        <div className="no-posts">
          {posts.length === 0 
            ? "No posts found." 
            : "No posts match your current filters."
          }
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="posts-count">
        Showing {processedPosts.length} of {posts.length} posts
      </div>
      
      <div className="posts-grid">
        {processedPosts.map(post => (
          <Post isCreator={authUsername === post.username} key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};