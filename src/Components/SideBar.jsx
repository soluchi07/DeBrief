import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './SideBar.css';
import { supabase } from '../../client'; 
import pfp from '../assets/profile-photo.png'
import home from '../assets/home.png'

const SideBar = () => {
  // const location = useLocation();
  const [username, setUserName] = useState('')
  const [fandoms, setFandoms] = useState(null);

  const navItems = [
    {
      path: '/home',
      label: 'Home',
      icon: <img style={{width: '100%', backgroundColor: 'var(--primary)', borderRadius: '50%'}} src={home} alt="home icon"/>
    },
    // {
    //   // path: '/home/profile',
    //   path: '/home',
    //   label: 'Profile',
    //   icon: '👤'
    // },
    {
      // path: '/home/posts',
      path: '/home',
      label: 'My Posts',
      icon: '📝'
    }
    //, {
    //   // path: '/home/favorites',
    //   path: '/home',
    //   label: 'Favorites',
    //   icon: '❤️'
    // },
    // {
    //   // path: '/home/settings',
    //   path: '/home',
    //   label: 'Settings',
    //   icon: '⚙️'
    // }
  ];

  useEffect(() => {
    const fetchUsername = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single(); 
      setUserName(profile.username) 

      if (profileError){
        console.error(profileError)
      }
    }

    const fetchFandoms = async () => {
      const { data } = await supabase
      .from('Posts')
      .select('fandom')

      // console.log(data)
      let arr = []

      for (const obj of data){
        if (!arr.includes(obj.fandom)){
          arr.push(obj.fandom)
        }
      }
      console.log(arr)
      setFandoms(arr)
    }
      fetchUsername();
      fetchFandoms();

    
  }, [])

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Navigation</h2>
      </div>
      
  
      <nav className="sidebar-nav-fandoms">
        <div className='sidebar-nav'>
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${item.label === 'Home' ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar-fandoms">
          <h5>Our Fandoms</h5>
            <ul className="nav-list">
            {fandoms && fandoms.map((item, index) => (
              <li key={index} className="nav-item fandoms">
                  <span className="nav-label">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <span>
              <img src={pfp} alt="profile photo" style={{width: '100%', position: 'relative', top: '2px'}} />
            </span>
          </div>
          <div className="user-details">
            <p className="user-name">Welcome back! {username}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;