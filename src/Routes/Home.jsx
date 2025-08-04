import { supabase } from '../../client';
import { useNavigate } from 'react-router-dom';
import List from '../Components/List';
import { useState } from 'react';
import HomeUtilities from '../Components/HomeUtilities';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [hideSpoilers, setHideSpoilers] = useState(false);

   const handleSearch = (term) => {
    setSearchTerm(term);
    // You can pass this to your List component or handle the filtering logic here
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    // You can pass this to your List component to sort the posts
  };

  const handleSpoilerFilter = (hide) => {
    setHideSpoilers(hide);
    // You can pass this to your List component to filter out spoiler posts
  };

  return (
    <>
        <HomeUtilities 
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onSpoilerFilter={handleSpoilerFilter}
        />
        <List 
          searchTerm={searchTerm}
          sortBy={sortBy}
          hideSpoilers={hideSpoilers}
        />
        {/* add spoiler filter with season and episode number filters */}
    </>
  )
}
