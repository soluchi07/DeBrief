import React, { useState } from 'react';
import './HomeUtilities.css';

const HomeUtilities = ({ onSearch, onSortChange, onSpoilerFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [hideSpoilers, setHideSpoilers] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  const handleSpoilerToggle = (e) => {
    const checked = e.target.checked;
    setHideSpoilers(checked);
    onSpoilerFilter(checked);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="home-utilities">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search posts by title or fandom..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="clear-search-btn"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <div className="search-icon">
            🔍
          </div>
        </div>
      </div>

      {/* Controls Container */}
      <div className="controls-container">
        {/* Sort Options */}
        <div className="sort-container">
          <h4 className="control-label">Sort by:</h4>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="sortBy"
                value="created_at"
                checked={sortBy === 'created_at'}
                onChange={handleSortChange}
                className="radio-input"
              />
              <span className="radio-custom"></span>
              <span className="radio-text">Newest First</span>
            </label>
            
            <label className="radio-label">
              <input
                type="radio"
                name="sortBy"
                value="likes"
                checked={sortBy === 'likes'}
                onChange={handleSortChange}
                className="radio-input"
              />
              <span className="radio-custom"></span>
              <span className="radio-text">Most Liked</span>
            </label>
          </div>
        </div>

        {/* Spoiler Filter */}
        <div className="filter-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={hideSpoilers}
              onChange={handleSpoilerToggle}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">Hide Spoiler Posts</span>
          </label>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || hideSpoilers) && (
        <div className="active-filters">
          <span className="filters-label">Active filters:</span>
          {searchTerm && (
            <span className="filter-tag">
              Search: "{searchTerm}"
              <button onClick={clearSearch} className="remove-filter">✕</button>
            </span>
          )}
          {hideSpoilers && (
            <span className="filter-tag">
              Spoilers Hidden
              <button 
                onClick={() => handleSpoilerToggle({ target: { checked: false } })} 
                className="remove-filter"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeUtilities;