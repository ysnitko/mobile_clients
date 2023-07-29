import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Client from '../Client/Client';
import { eventsListClients } from '../events';
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

  componentDidMount = () => {
    eventsListClients.addListener('delClicked', this.handleDeleteClient);
    eventsListClients.addListener('editClicked', this.handleEditClient);
    eventsListClients.addListener('saveClicked', this.setNewText);
    eventsListClients.addListener('addClicked', this.handleAddClient);
    eventsListClients.addListener('filterActive', this.handleFilterActive);
    eventsListClients.addListener('filterBlock', this.handleFilterBlocked);
    eventsListClients.addListener('showAll', this.handleShowAll);
  };

  componentWillUnmount = () => {
    eventsListClients.removeListener('delClicked', this.handleDeleteClient);
    eventsListClients.removeListener('editClicked', this.handleEditClient);
    eventsListClients.removeListener('saveClicked', this.setNewText);
    eventsListClients.removeListener('addClicked', this.handleAddClient);
    eventsListClients.removeListener('filterActive', this.handleFilterActive);
    eventsListClients.removeListener('filterBlock', this.handleFilterBlocked);
    eventsListClients.removeListener('showAll', this.handleShowAll);
  };

  btnClickToAdd = (event) => {
    eventsListClients.emit('addClicked', null);
  };

  btnClickToActive = (event) => {
    eventsListClients.emit('filterActive', null);
  };

  btnClickToBlocked = (event) => {
    eventsListClients.emit('filterBlock', null);
  };

  btnClickToAll = (event) => {
    eventsListClients.emit('showAll', null);
  };

  render() {
    console.log('UserList render');
    const usersList = this.state.filteredUsers.map((item) => {
      return (
        <Client
          key={item.id}
          info={item}
          isDisabled={this.state.isDisabled}
          isSelected={this.state.isSelected}
        />
      );
    });
    return (
      <>
        <div className="btn-block">
          <input type="button" value="all" onClick={this.btnClickToAll} />
          <input type="button" value="active" onClick={this.btnClickToActive} />
          <input
            type="button"
            value="blocked"
            onClick={this.btnClickToBlocked}
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
          onClick={this.btnClickToAdd}
          // {this.handleAddClient}
        />
      </>
    );
  }
}

export default UsersList;
