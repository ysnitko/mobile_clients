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
    isDisabled: true,
    isSelected: false,
  };

  setNewText = (
    id,
    firstNameLink,
    lastNameLink,
    secondaryLink,
    balanceLink
  ) => {
    let firstName = firstNameLink.current.value;
    let lastName = lastNameLink.current.value;
    let secondary = secondaryLink.current.value;
    let balanceR = balanceLink.current.value;
    const editedClient = this.state.filteredUsers.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          first_name: firstName,
          last_name: lastName,
          secondary_name: secondary,
          balance: +balanceR,
        };
      }
      return user;
    });

    this.setState({
      users: editedClient,
      filteredUsers: editedClient,
      isDisabled: true,
      isSelected: false,
    });
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

  handleEditClient = (id) => {
    const editedClient = this.state.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
        };
      }
      return user;
    });
    this.setState({
      users: editedClient,
      filteredUsers: editedClient,
      isDisabled: false,
      isSelected: true,
    });
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
          isDisabled={this.state.isDisabled}
          newText={this.setNewText}
          isSelected={this.state.isSelected}
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
