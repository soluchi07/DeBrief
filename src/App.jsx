import LargeBanner from "./Components/LargeBanner"
import { useEffect, useState } from "react";

export default function App() {
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
    

    const login = () => {
        window.location = '/login'
    }

    return (
        <div id='landing-page'>
            <LargeBanner theme={theme} setTheme={setTheme}/>
            <div id="get-started">
                <h1>Welcome to DeBrief!</h1>
                <h3>Wanna rant about your favourite shows and movies? We've got you ;)</h3>
                <button onClick={login}>Get Started!</button>
            </div>
            
        </div>
    )
}