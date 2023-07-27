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
      })
    ),
  };

  state = {
    users: this.props.users,
    filteredUsers: this.props.users,
  };

  handleAddClient = () => {
    const newClient = {
      id: this.props.users.length + 1,
      first_name: prompt('Enter first name:'),
      last_name: prompt('Enter last name:'),
      secondary_name: prompt('Enter secondary name:'),
      balance: +prompt('Enter balance'),
    };
    const addNewClient = [...this.state.users, newClient];
    this.setState({
      users: addNewClient,
      filteredUsers: addNewClient,
    });
  };

  handleDeleteClient = (id) => {
    const deletedClient = this.state.users.filter((user) => user.id !== id);
    this.setState({
      users: deletedClient,
      filteredUsers: deletedClient,
    });
  };

  handleEditClient = () => {
    const newFirstName = prompt('Enter new first name:');
    const newLastName = prompt('Enter new last name:');
    const newSecondaryName = prompt('Enter new secondary name:');
    const newBalance = +prompt('Enter new balance:');
    this.setState((prevState) => ({
      users: prevState.users.map((user) => {
        if (user.id === this.props.id) {
          return {
            ...user,
            first_name: newFirstName,
            last_name: newLastName,
            secondary_name: newSecondaryName,
            balance: newBalance,
          };
        }
        return user;
      }),
      filteredUsers: prevState.filteredUsers.map((user) => {
        if (user.id === this.props.id) {
          return {
            ...user,
            first_name: newFirstName,
            last_name: newLastName,
            secondary_name: newSecondaryName,
            balance: newBalance,
          };
        }
        return user;
      }),
    }));
  };

  handleFilterActive = () => {
    const activeClients = this.state.users.filter((item) => item.balance >= 0);
    this.setState({
      filteredUsers: activeClients,
    });
  };

  handleFilterBlocked = () => {
    const blockedClients = this.state.users.filter((item) => item.balance < 0);
    this.setState({
      filteredUsers: blockedClients,
    });
  };

  handleShowAll = () => {
    this.setState({
      filteredUsers: this.state.users,
    });
  };

  render() {
    console.log('UserList render');
    const usersList = this.state.filteredUsers.map((item) => {
      return (
        <Client
          key={item.id}
          info={item}
          delClient={this.handleDeleteClient}
          editClient={this.handleEditClient}
        />
      );
    });
    return (
      <>
        <div className="btn-block">
          <input type="button" value="all" onClick={this.handleShowAll} />
          <input
            type="button"
            value="active"
            onClick={this.handleFilterActive}
          />
          <input
            type="button"
            value="blocked"
            onClick={this.handleFilterBlocked}
          />
        </div>
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
