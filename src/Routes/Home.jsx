import { supabase } from '../../client';
import { useNavigate } from 'react-router-dom';
import List from '../Components/List';

export default function Home() {

  return (
    <>
        {/* <button onClick={handleLogout}>Logout</button> */}
        <List/>
    </>
      //  TODO  make menu on hover of profile photo*
  )
}
