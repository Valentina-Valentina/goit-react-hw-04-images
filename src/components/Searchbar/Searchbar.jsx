import { useState } from 'react';
import { toast } from 'react-toastify';

import { SearchbarHeader, Form, Button, Input } from './Searchbar.module';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = ({ currentTarget: { value } }) => {
    setSearchQuery(value.toLowerCase().trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery === '') {
      toast.info('Please, enter search word!');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchbarHeader className="searchbar">
      <Form className="form" onSubmit={handleSubmit}>
        <Input
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleQueryChange}
        />

        <Button type="submit" className="button">
          <span className="button-label">Search</span>
        </Button>
      </Form>
    </SearchbarHeader>
  );
};
