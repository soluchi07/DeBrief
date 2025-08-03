import {Link} from 'react-router-dom'
import '../App.css'
import { useState, useEffect } from 'react';

export default function NotFound() {
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

  return (
    <div>
        <h1 style={{opacity: '0.6'}}>You seem lost friend...</h1>
        <h3 style={{opacity: '0.6'}}>I can help with that though!</h3>
        <Link to='/'>
            <button>Here you go :)</button>
        </Link>
    </div>
  )
}