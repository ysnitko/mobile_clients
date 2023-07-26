import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Client from '../Client/Client';
import './UsersLits.css';

class UsersList extends PureComponent {
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        secondary_name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        // status: PropTypes.string,
      })
    ),
  };

  state = {
    status: '',
    users: this.props.users,
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    secondary_name: this.props.secondary_name,
    balance: this.props.balance,
  };

  handleAddClient = () => {
    const newClient = {
      id: this.props.users.length + 1,
      first_name: prompt('Enter first name:'),
      last_name: prompt('Enter last name:'),
      secondary_name: prompt('Enter secondary name:'),
      balance: prompt('Enter balance'),
    };
    const updatedClient = [...this.state.users, newClient];
    this.setState({
      users: updatedClient,
    });
  };

  handleDeleteClient = (id) => {
    const deletedClient = this.state.users.filter((user) => user.id !== id);
    this.setState({
      users: deletedClient,
    });
  };

  handleEditClient = () => {
    const newFirstName = prompt('Enter new first name:');
    const newLastName = prompt('Enter new last name:');
    const newSecondaryName = prompt('Enter new secondary name:');
    const newBalance = prompt('Enter new secondary name:');
    this.props.updateClientInfo(
      this.props.id,
      newFirstName,
      newLastName,
      newSecondaryName,
      newBalance
    );
  };

  render() {
    console.log('UserList render');
    const usersList = this.state.users.map((item) => {
      return (
        <Client
          key={item.id}
          id={item.id}
          first_name={item.first_name}
          last_name={item.last_name}
          secondary_name={item.secondary_name}
          balance={item.balance}
          status={this.state.status}
          users={this.state.users}
          delClient={this.handleDeleteClient}
          editClient={this.handleEditClient}
        />
      );
    });
    return (
      <>
        <table>
          <thead>
            <tr>
              <td> First name </td>
              <td> Last name</td>
              <td> Secondary name</td>
              <td> Balance</td>
              <td> Status</td>
              <td> Edit</td>
              <td> Delete</td>
            </tr>
          </thead>
          <tbody>{usersList}</tbody>
        </table>
        <input
          className="add-user-btn"
          type="button"
          value="Add client"
          onClick={this.handleAddClient}
        />
      </>
    );
  }
}

export default UsersList;
