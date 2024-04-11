import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { MenuItem, MenuList, Paper, ClickAwayListener } from '@mui/material';
import axios from 'axios';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: '#e4e8eb',
  },
});

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/art');
        const artworksData = response.data;
        // Filter artworks based on search query
        const filtered = artworksData.filter((artwork) =>
          artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredArtworks(filtered);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    // Only fetch data when searchQuery is not empty
    if (searchQuery) {
      fetchData();
    } else {
      setFilteredArtworks([]); // Clear filtered artworks when search query is empty
    }
  }, [searchQuery]);

  const handleSearch = () => {
    // Perform search on backend if needed
    console.log('Searching for:', searchQuery);
  };

  const handleCloseMenu = () => {
    setFilteredArtworks([]); // Close the menu by clearing filtered artworks
  };

  return (
    <div style={{ position: 'relative' }}>
      <StyledTextField
        placeholder="Search Artworks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link to="#" onClick={handleSearch}>
                <SearchIcon
                  sx={{
                    borderRadius: '50%', // Rounded border
                    border: '1px solid #ccc', // Border color
                    padding: '5px', // Padding
                  }}
                />
              </Link>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        size="small"
        sx={{ marginLeft: 9 }}
      />
      {/* Display filtered artworks as menu items */}
      {filteredArtworks.length > 0 && (
        <Paper
          ref={menuRef}
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0,
            right: 0, // Adjust for centering
            margin: '0 auto', // Adjust for centering
            zIndex: 999,
            maxHeight: '500px', // Set max height for scrollability
            overflowY: 'auto', // Enable vertical scroll
            // Scrollbar styles
            WebkitOverflowScrolling: 'touch', // Optional: Enables smooth scrolling on iOS
            scrollbarWidth: 'thin', // Optional: Use 'thin', 'auto', or 'none'
            scrollbarColor: '#888 #f1f1f1', // Optional: Scrollbar color (thumb and track)
            '&::-webkit-scrollbar': {
              width: '8px', // Width of the scrollbar
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1', // Color of the track
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888', // Color of the scrollbar handle
              borderRadius: '4px', // Rounded corners
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555', // Color of the scrollbar handle on hover
            },
          }}
        >
          <ClickAwayListener onClickAway={handleCloseMenu}>
            <MenuList style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>
              {filteredArtworks.map((artwork, index) => (
                <MenuItem
                  key={index}
                  style={{
                    width: 'calc(50% - 5px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer', // Add cursor pointer for clickable effect
                    textDecoration: 'none', // Remove default link decoration
                    color: 'inherit', // Inherit color from parent
                  }}
                >
                  <Link to={`/product/${artwork.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Add Link to redirect to product page */}
                    <img
                      src={`http://localhost:8081/images/${artwork.art}`}
                      alt={artwork.title}
                      style={{ aspectRatio: "4/5", padding: '4px', height: '150px', width: 'auto' }}
                    />
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>{artwork.title}</div>
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;
