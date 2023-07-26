import React from 'react';
import PropTypes from 'prop-types';
import './Client.css';

class Client extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    secondary_name: PropTypes.string,
    balance: PropTypes.number.isRequired,
    // status: PropTypes.string,
  };

  state = {
    balance: this.props.balance,
    status: this.props.balance >= 0 ? 'active' : 'blocked',
  };

  componentDidUpdate = (oldProps, oldState) => {
    console.log('MobileClient id=' + this.props.id + ' componentDidUpdate');
    if (this.props.balance !== this.state.balance)
      this.setState({ balance: this.props.balance });
  };

  shouldComponentUpdate = (newProps, newState) => {
    console.log('MobileClient id=' + this.props.id + ' shouldComponentUpdate');
    return (
      newProps.fio !== this.props.fio || newProps.balance !== this.state.balance
    );
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
          <input className="edit-del-btn" type="button" value="Edit" />
        </td>
        <td>
          <input className="edit-del-btn" type="button" value="Delete" />
        </td>
      </tr>
    );
  }
}

export default Client;
