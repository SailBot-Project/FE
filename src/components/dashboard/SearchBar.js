import React from 'react';
import { Card, CardBody, CardHeader, Input, Button } from 'reactstrap';

const SearchBar = ({ search, onSearchChange, onSearchClick }) => {
    return (
      <Card style={{ marginBottom: '20px' }}>
        <CardHeader>검색</CardHeader>
        <CardBody>
          <Input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="검색어 입력"
            style={{ marginBottom: '10px' }}
          />
          <Button color="primary" onClick={onSearchClick}>
            검색
          </Button>
        </CardBody>
      </Card>
    );
  };

  export default SearchBar;