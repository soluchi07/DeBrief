import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import Post from './Post'
import { Link } from 'react-router-dom'

export default function List() {
    const [posts, setPosts] = useState(null)
    const [authUsername, setAuthUserName] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
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
        }

        fetchPost();
    }, [])


    return (
            posts && posts.length > 0 ?
                (posts.map((item) => {
                    return(
                        <Post key={item.id} isCreator={authUsername === item.username} post={item}/>
                    )

                }))    
            :
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading page...</p>
            </div>
            
        
    )
}
