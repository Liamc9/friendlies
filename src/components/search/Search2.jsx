// src/components/search/Search2.jsx
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { BottomDrawer, SearchLogic } from 'liamc9npm'; // adjust paths as needed

// Styled Components
const Container = styled.div`
  padding: 16px;
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 12px; /* padding-right for the 'X' button */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
    outline: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #555;
  }
`;

const SuggestionsList = styled.ul`
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const SectionTitle = styled.h4`
  margin: 16px 0 8px;
  font-size: 14px;
  color: #555;
`;

const SearchButton = styled.button`
  width: 100%;
  max-width: 300px;
    margin: 20px;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: white;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: left;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    border-color: #007bff;
  }
`;

const SearchText = styled.span`
  color: ${({ hasQuery }) => (hasQuery ? '#000' : '#888')};
`;

// Main Component
const Search2 = ({ items, onSearch, historyItems = [] }) => {
  // Use memoized options for Fuse.js (or similar) search
  const fuseOptions = useMemo(() => ({ keys: ['title'] }), []);

  // Destructure logic from the custom SearchLogic hook
  const {
    isOpen,
    open,
    close,
    query,
    suggestions,
    lastQuery,
    handleInputChange,
    handleSuggestionClick,
    handleSearchForClick,
  } = SearchLogic({ items, onSearch, historyItems }, fuseOptions);

  // Render recent searches when there's no active query
  const renderRecentSearches = () => {
    if (query || historyItems.length === 0) return null;
    return (
      <>
        <SectionTitle>Recent Searches</SectionTitle>
        <SuggestionsList>
          {historyItems.map((item, index) => (
            <SuggestionItem key={index} onClick={() => handleSuggestionClick(item)}>
              {item.title}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      </>
    );
  };

  // Render search suggestions when the user types a query
  const renderSuggestions = () => {
    if (!query || suggestions.length === 0) return null;
    return (
      <SuggestionsList>
        <SuggestionItem onClick={handleSearchForClick}>
          Search For "{query}"
        </SuggestionItem>
        {suggestions.map((item, index) => (
          <SuggestionItem key={index} onClick={() => handleSuggestionClick(item)}>
            {item.title}
          </SuggestionItem>
        ))}
      </SuggestionsList>
    );
  };

  return (
    <>
      <SearchButton onClick={open}>
        <SearchText hasQuery={Boolean(lastQuery)}>
          {lastQuery || 'Search...'}
        </SearchText>
      </SearchButton>
      <BottomDrawer isOpen={isOpen} onClose={close}>
        <Container>
          <SearchInputContainer>
            <SearchInput
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search tasks..."
            />
            {query && (
              <CloseButton onClick={close} aria-label="Close Search">
                &times;
              </CloseButton>
            )}
          </SearchInputContainer>
          {renderRecentSearches()}
          {renderSuggestions()}
        </Container>
      </BottomDrawer>
    </>
  );
};

export default Search2;
