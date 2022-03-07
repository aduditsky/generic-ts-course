import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

interface ISearchInput {
  setSearchQuery: (searchQuery: string) => void;
}

function SearchInput(props: ISearchInput) {
  const { setSearchQuery } = props;
  const [query, setQuery] = useState<string>('');
  const debounceQuery = useDebounce(query, 250);

  useEffect(() => {
    setSearchQuery(debounceQuery);
  }, [debounceQuery, setSearchQuery]);

  return (
    <>
      <label htmlFor='search' className='mt-3'>
        Search! Try me
      </label>
      <input
        id='search'
        className='form-control full-width'
        type='search'
        placeholder='Search...'
        aria-label='Search'
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </>
  );
}

export default SearchInput;
