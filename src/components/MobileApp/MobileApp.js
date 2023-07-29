import React, { PureComponent } from 'react';
import UsersList from '../UsersList/UsersList';

let users = require('../../users.json');

class MobileApp extends PureComponent {
  render() {
    console.log('MobileApp render');
    return <UsersList users={users} />;
  }
}

export default MobileApp;
