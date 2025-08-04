import { supabase } from '../../client';
import { useNavigate } from 'react-router-dom';
import List from '../Components/List';

export default function Home() {

  return (
    <>
        <List/>
        {/* TODO add search bar here*/}
        {/* add spoiler filter with season and episode number filters */}
    </>
  )
}
