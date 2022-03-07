import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

export interface ISearchInputProps {
  searchQuery: string;
  setSearchQuery(searchQuery: string): void;
}

export function SearchInput(props: ISearchInputProps) {
  const { setSearchQuery, searchQuery } = props;
  const [query, setQuery] = useState<string>(searchQuery);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <>
      <label htmlFor='search' className='mt-3'>
        Search! Try me!
      </label>
      <input
        value={query}
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
