import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import Post from './Post'
import { Link } from 'react-router-dom'

export default function List() {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: false })
            //TODO add sort on top that ONLY sorts by time. pass the sort prop here and use it as the ascending value

            // set state of posts
            setPosts(data)
            // console.log(data)
        }

        fetchPost();
    }, [])


    return (
            posts && posts.length > 0?
                (posts.map((item) => {
                    return(
                        <Post key={item.id} post={item}/>
                    )

                }))    
            :
            <>
            </>
            
        
    )
}
