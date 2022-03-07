import React from 'react';
import Moment from 'react-moment';
import IPerson from '../../interfaces/IPerson';

export default function PeopleRenderer(props: IPerson) {
  const { firstName, lastName, eyeColor, birthday } = props;
  return (
    <div className='col-12 p-3'>
      <div className={'card'}>
        <div className='card-body'>
          <h3 className='card-title'>
            👤&nbsp;{firstName} {lastName}
          </h3>
          <ul>
            <li>
              👁&nbsp;Has <b>{eyeColor}</b> eyes
            </li>
            <li>
              🎂&nbsp;Birthday:{' '}
              <b>
                <Moment date={birthday} format={'MMMM D, YYYY'} />
              </b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
