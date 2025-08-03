import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react'
import logo_light from '../assets/logo_light.png'
import logo_dark from '../assets/logo_dark.png'
import '../App.css'


export default function LargeBanner({theme, setTheme}) {
    // TODO remove the outside div in large banners and make the nav the only outer element
    
  return (
        <nav>
            <img
                src={theme === 'light' ? logo_light : logo_dark} 
                alt="debrief logo"
            />
            <div className="theme-toggle-container">
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
                {/* <button onClick={() => supabase.auth.signOut()}>Logout</button> */}
        </nav>      
  )
}
