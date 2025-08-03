import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../client'
import LargeBanner from '../Components/LargeBanner'
  
export default function Login() {
    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      });

      const { data: { subscription },} = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      });

      return () => subscription.unsubscribe()
    }, [])

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


    useEffect(() => {
      if (session) {

      // createProfile();

        setTimeout(() => {
          window.location.href = '/home';
        }, 1000);

      }

    }, [session]);

    //   const { data: { user } } = await supabase.auth.getUser() 
    const createProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!session?.user) return;

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        // Create profile if it doesn't exist
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            username: user.user_metadata?.username || user.email.split('@')[0]
          });
        
        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }
    }

      return (
        //TODO find a way to go back to the landing page from here
        <>
          {!session ?
            <div id='login'>
              <LargeBanner theme={theme} setTheme={setTheme}/>
              <h2>Sign up / Sign in</h2>
              <Auth
                supabaseClient={supabase} 
                appearance={{ 
                  theme: ThemeSupa, // ThemeSupa adapts to CSS variables
                  variables: {
                    default: {
                      colors: {
                        brand: theme === 'dark' ? '#287aa9' : '#56a8d7',
                        brandAccent: theme === 'dark' ? '#ffae3d' : '#c27100',
                        // Add more color overrides if needed
                      }
                    }
                  }
                }}
                providers={[]} 
                theme={theme === "dark" ? "dark" : ""}
              />
           </div>
           : 
           <>
              <div>
                <h3>Setting up your account...</h3>
                <p>Please wait while we prepare your dashboard.</p>
              </div>
            </>}
        </>
        //             // <h1>Welcome, {session.user.email.slice(0,6) + '...'}!</h1>
        //             // <p>Logged in!</p>
        //             // <button onClick={sayHi}>Hi!</button>
      )
    }
  