import React from 'react';

const HighlightSearchTerm = (search, text) => {
    const regex = new RegExp(`(${search})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ fontWeight: 'bold'}}>{part}</span>
      ) : part
    );
  };

  export default HighlightSearchTerm;