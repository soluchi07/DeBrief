import {useState, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../../client'
import SmallBanner from '../Components/SmallBanner'
import SideBar from '../Components/SideBar'
import add from '../assets/add.png'
// import '../App.css'


export default function Layout() {
      // Initialize theme state in the parent component
      const [theme, setTheme] = useState(() => {
          // Check localStorage first, then system preference
          const saved = localStorage.getItem('theme');
          if (saved) return saved;
          
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      });
  
      // Apply theme changes to document
      useEffect(() => {
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('theme', theme);
      }, [theme]);

      const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      });

      return () => subscription.unsubscribe()
    }, [])
    
  return (
    <>
      {session ?
        <div id='layout'>
          <SmallBanner theme={theme} setTheme={setTheme}/>
            <div id='side-main'>
              <SideBar/>
              <div id="main-pane">
                
                <Outlet/>
                <Link to='/home/add-post'>
                  {/* <button id='add-button'><img src={add} alt="Add Post Button" /></button> */}
                  <button className="add-button">
                    <img src={add} alt="Add post"/>
                  </button>
                </Link>
              </div>
            </div>
            
          
        </div>
        :
        <>
          <h1 style={{opacity: '0.6'}}>Looks like you're not logged in buddy</h1>

          <Link to='/login'>
            <button>Login</button>
          </Link>
        </>
      }
    </>
    
  )
}
