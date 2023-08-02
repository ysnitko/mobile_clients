import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { eventsListClients } from '../events';
import './Client.css';
class Client extends PureComponent {
  static propTypes = {
    info: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      secondary_name: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  state = {
    info: this.props.info,
    isSelected: true,
  };

  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  secondaryNameRef = React.createRef();
  balanceRef = React.createRef();

  btnClickToDelete = (event) => {
    eventsListClients.emit('delClicked', this.props.info.id);
  };

  btnClickToEdit = (event) => {
    this.setState({ isSelected: false });
    eventsListClients.emit('editClicked', this.state.info.id);
  };

  btnClickToSave = (event) => {
    this.setState({ isSelected: true });
    eventsListClients.emit(
      'saveClicked',
      this.props.info.id,
      this.firstNameRef,
      this.lastNameRef,
      this.secondaryNameRef,
      this.balanceRef
    );
  };

  render() {
    console.log('Client id=' + this.props.info.id + ' render ');
    return (
      <tr className="User">
        <td>
          <input
            type="text"
            ref={this.firstNameRef}
            name=""
            defaultValue={this.state.info.first_name}
            style={{ textAlign: 'center', border: 'none' }}
            disabled={this.state.isSelected}
          />
        </td>
        <td>
          <input
            type="text"
            ref={this.lastNameRef}
            name=""
            defaultValue={this.state.info.last_name}
            style={{ border: 'none', textAlign: 'center' }}
            disabled={this.state.isSelected}
          />
        </td>
        <td>
          <input
            type="text"
            ref={this.secondaryNameRef}
            name=""
            defaultValue={this.state.info.secondary_name}
            style={{ border: 'none', textAlign: 'center' }}
            disabled={this.state.isSelected}
          />
        </td>
        <td>
          <input
            type="text"
            ref={this.balanceRef}
            name=""
            defaultValue={this.state.info.balance}
            style={{ border: 'none', textAlign: 'center' }}
            disabled={this.state.isSelected}
          />
        </td>
        <td
          style={
            this.props.info.balance >= 0
              ? { backgroundColor: 'green' }
              : { backgroundColor: 'darkred' }
          }
        >
          {this.props.info.balance >= 0 ? 'active' : 'blocked'}
        </td>
        <td>
          {this.state.isSelected ? (
            <input
              className="edit-del-btn"
              type="button"
              value="Edit"
              onClick={this.btnClickToEdit}
            />
          ) : (
            <input
              className="edit-del-btn"
              type="button"
              value="Save"
              onClick={this.btnClickToSave}
            />
          )}
        </td>
        <td>
          <input
            className="edit-del-btn"
            type="button"
            value="Delete"
            onClick={this.btnClickToDelete}
          />
        </td>
      </tr>
    );
  }
}
export default Client;
