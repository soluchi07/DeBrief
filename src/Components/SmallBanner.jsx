import ThemeToggle from './ThemeToggle';
import logo_light from '../assets/logo_light.png'
import logo_dark from '../assets/logo_dark.png'
import { useNavigate } from 'react-router-dom';
import '../App.css'


export default function SmallBanner({theme, setTheme}) {

    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login'); // Redirect after sign-out completes
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
        <nav>
            <img
                src={theme === 'light' ? logo_light : logo_dark} 
                alt="debrief logo"
            />
            {/* TODO add search bar here and notifications button, default bell icon for no noti*/}
            <button onClick={handleLogout}>Logout</button>
            <div className="theme-toggle-container">
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
                {/* <button onClick={() => supabase.auth.signOut()}>Logout</button> */}
        </nav>      
  )
}
