import React, { useState } from 'react';
import IFilterProperty from '../interfaces/IFilterProperty';
import ISortersProperty from '../interfaces/ISortersProperty';
import PropsWithChildrenFunction from '../types/PropsWithChildrenFunction';
import genericFilter from '../utils/genericFilter';
import genericSearch from '../utils/genericSearch';
import genericSort from '../utils/genericSort';
import { Filters } from './Filters';
import { SearchInput } from './SearchInput';
import { Sorters } from './Sorters';

interface ISearchSortAndFilterProps<T> {
  title: string;
  dataSource: Array<T>;
  searchProperties: Array<keyof T>;
  initialSearchQuery: string;
  initialSortProperty: ISortersProperty<T>;
  initialFilterProperty: Array<IFilterProperty<T>>;
}

export interface ISearchSortAndFilterState<T> {
  searchQuery: string;
  sortProperty: ISortersProperty<T>;
  filterProperties: Array<IFilterProperty<T>>;
}

export default function SearchSortAndFilter<T>(
  props: PropsWithChildrenFunction<ISearchSortAndFilterProps<T>, T>
) {
  const {
    title,
    dataSource,
    searchProperties,
    initialSearchQuery,
    initialSortProperty,
    initialFilterProperty,
    children,
  } = props;

  const [searchSortAndFilterState, setSearchSortAndFilterState] = useState<
    ISearchSortAndFilterState<T>
  >({
    searchQuery: initialSearchQuery,
    sortProperty: initialSortProperty,
    filterProperties: initialFilterProperty,
  });

  const { searchQuery, sortProperty, filterProperties } =
    searchSortAndFilterState;

  return (
    <>
      <h2>{title}</h2>
      <SearchInput
        searchQuery={initialSearchQuery}
        setSearchQuery={(searchQuery) =>
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            searchQuery,
          })
        }
      />
      <Sorters
        dataSource={dataSource}
        setSortProperty={(sortProperty) =>
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            sortProperty,
          })
        }
      />
      <Filters
        dataSource={dataSource}
        filterProperties={filterProperties}
        setFilterProperties={(filterProperties) =>
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            filterProperties,
          })
        }
      />
      {children &&
        dataSource
          .filter((a) => genericSearch(a, searchProperties, searchQuery, false))
          .sort((a, b) => genericSort(a, b, sortProperty))
          .filter((a) => genericFilter(a, filterProperties))
          .map((a) => children(a))}
    </>
  );
}
