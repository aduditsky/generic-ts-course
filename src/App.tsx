import React, { useState } from 'react';
import widgets from './mock-data/widgets';
import people from './mock-data/people';
import WidgetRenderer from './components/renderers/WidgetRenderer';
import PeopleRenderer from './components/renderers/PeopleRenderer';
import SearchSortAndFilter from './components/SearchSortAndFilter';

function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const buttonText = showPeople ? 'Show widgets' : 'Show people';
  return (
    <>
      <button
        className='btn btn-primary'
        onClick={() => setShowPeople(!showPeople)}
      >
        {buttonText}
      </button>
      {!showPeople && (
        <>
          <SearchSortAndFilter
            title='Widgets:'
            searchProperties={['title', 'description']}
            dataSource={widgets}
            initialSortProperty={{ property: 'title', isDescending: true }}
            initialFilterProperty={[]}
            initialSearchQuery=''
          >
            {(widget) => <WidgetRenderer {...widget} key={widget.id} />}
          </SearchSortAndFilter>
        </>
      )}
      {showPeople && (
        <>
          <SearchSortAndFilter
            title='People:'
            searchProperties={['firstName', 'lastName', 'eyeColor']}
            dataSource={people}
            initialSortProperty={{ property: 'firstName', isDescending: true }}
            initialFilterProperty={[]}
            initialSearchQuery=''
          >
            {(person) => <PeopleRenderer {...person} key={person.id} />}
          </SearchSortAndFilter>
        </>
      )}
    </>
  );
}

export default App;
