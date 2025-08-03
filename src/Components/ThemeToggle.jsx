// ThemeToggle.jsx
import '../App.css'
import dark from '../assets/switch_darkmode.png'
import light from '../assets/switch_lightmode.png'


const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button id='theme-toggle' onClick={toggleTheme}>
      <img
      src={theme === 'light' ? light : dark}
      alt="dark-mode toggle" />
    </button>
  );
};

export default ThemeToggle;