import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import './UserSearch.css';

const UserSearch = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch(''); // Clear search results
  };

  return (
    <div className="user-search">
      <form onSubmit={handleSubmit} className="search-form">
        <Input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="search-actions">
          <Button
            type="submit"
            disabled={searchTerm.trim().length < 2}
            loading={loading}
          >
            Search
          </Button>
          {searchTerm && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
            >
              Clear
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserSearch;
