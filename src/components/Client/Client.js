import React from 'react';
import PropTypes from 'prop-types';
import './Client.css';

class Client extends React.Component {
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
    delClient: PropTypes.func.isRequired,
    editClient: PropTypes.func.isRequired,
  };

  state = {
    balance: this.props.balance,
    status: this.props.balance >= 0 ? 'active' : 'blocked',
  };

  render() {
    console.log(
      'MobileClient id=' + this.props.id + ' render ' + this.state.balance
    );
    return (
      <tr className="User">
        <td> {this.props.first_name}</td>
        <td> {this.props.last_name}</td>
        <td> {this.props.secondary_name}</td>
        <td> {this.props.balance}</td>
        <td
          style={
            this.props.balance >= 0
              ? { backgroundColor: 'green' }
              : { backgroundColor: 'darkred' }
          }
        >
          {this.state.status}
        </td>
        <td>
          <input
            className="edit-del-btn"
            type="button"
            value="Edit"
            onClick={() => this.props.editClient(this.props.id)}
          />
        </td>
        <td>
          <input
            className="edit-del-btn"
            type="button"
            value="Delete"
            onClick={() => this.props.delClient(this.props.id)}
          />
        </td>
      </tr>
    );
  }
}

export default Client;
