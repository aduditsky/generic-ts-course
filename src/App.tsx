import React, { useState } from 'react';
import widgets from './mock-data/widgets';
import people from './mock-data/people';

import IProperty from './interfaces/IProperty';
import IWidget from './interfaces/iWidget';
import IPerson from './interfaces/IPerson';

import genericSearch from './utils/genericSearch';
import genericSort from './utils/genericSort';

import SearchInput from './components/SearchInput';
import Sorters from './components/Sorters';
import WidgetRenderer from './components/Renderers/WidgetRenderer';
import PeopleRenderer from './components/Renderers/PeopleRenderer';

function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [widgetSortProperty, setWidgetSortProperty] = useState<
    IProperty<IWidget>
  >({
    property: 'title',
    isDescending: true,
  });
  const [peopleSortProperty, setPeopleSortProperty] = useState<
    IProperty<IPerson>
  >({
    property: 'firstName',
    isDescending: true,
  });
  const buttonText = showPeople ? 'Show Widgets' : 'Show Peolpe';
  return (
    <>
      <button type='button' onClick={() => setShowPeople(!showPeople)}>
        {buttonText}
      </button>
      <SearchInput
        setSearchQuery={(query) => {
          setQuery(query);
        }}
      />

      <>
        {!showPeople && (
          <>
            <h2>Widgets:</h2>
            <Sorters
              object={widgets[0]}
              setProperty={(propertyType) =>
                setWidgetSortProperty(propertyType)
              }
            />
            {widgets
              .filter((widget) =>
                genericSearch(widget, ['title', 'description'], query, false)
              )
              .sort((a, b) => {
                return genericSort(a, b, widgetSortProperty);
              })
              .map((widget) => {
                return <WidgetRenderer {...widget} />;
              })}
          </>
        )}

        {showPeople && (
          <>
            <h2>People:</h2>
            <Sorters
              object={people[0]}
              setProperty={(propertyType) =>
                setPeopleSortProperty(propertyType)
              }
            />
            {people
              .filter((person) =>
                genericSearch(person, ['firstName', 'lastName'], query, false)
              )
              .sort((a, b) => {
                return genericSort(a, b, peopleSortProperty);
              })
              .map((person) => {
                return <PeopleRenderer {...person} />;
              })}
          </>
        )}
      </>
    </>
  );
}

export default App;
