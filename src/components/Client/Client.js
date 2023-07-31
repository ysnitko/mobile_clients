import React from 'react';
import PropTypes from 'prop-types';
import { eventsListClients } from '../events';
import './Client.css';
class Client extends React.PureComponent {
  static propTypes = {
    info: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      secondary_name: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
    // isDisabled: PropTypes.bool.isRequired,

    selectedId: PropTypes.number,
  };

  state = {
    info: this.props.info,
    // isDisabled: this.props.isDisabled,
  };

  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  secondaryNameRef = React.createRef();
  balanceRef = React.createRef();

  componentDidUpdate = (oldProps, oldState) => {
    console.log('Client id=' + this.props.info.id + ' componentDidUpdate');
    if (
      this.props.info !== this.state.info ||
      oldProps.selectedId !== this.props.selectedId
    ) {
      this.setState({
        info: this.props.info,
        // isDisabled: this.props.isDisabled,
      });
    }
  };

  // shouldComponentUpdate = (newProps, newState) => {
  //   console.log('Client id=' + this.props.info.id + ' shouldComponentUpdate');
  //   return (
  //     newProps.info !== this.props.info ||
  //     newState.isDisabled !== this.state.isDisabled
  //   );
  // };

  btnClickToDelete = (event) => {
    eventsListClients.emit('delClicked', this.props.info.id);
  };

  btnClickToEdit = (event) => {
    eventsListClients.emit('editClicked', this.props.info.id);
  };

  btnClickToSave = (event) => {
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
      <tr
        className="User"
        style={
          this.props.selectedId !== this.props.info.id
            ? {}
            : { backgroundColor: '#b5f5d0' }
        }
      >
        <td>
          <input
            type="text"
            ref={this.firstNameRef}
            name=""
            defaultValue={this.state.info.first_name}
            style={{ textAlign: 'center', border: 'none' }}
            disabled={
              this.props.selectedId !== this.props.info.id ? true : false
            }
          />
        </td>
        <td>
          <input
            type="text"
            ref={this.lastNameRef}
            name=""
            defaultValue={this.state.info.last_name}
            style={{ border: 'none', textAlign: 'center' }}
            disabled={
              this.props.selectedId !== this.props.info.id ? true : false
            }
          />
        </td>
        <td>
          <input
            type="text"
            ref={this.secondaryNameRef}
            name=""
            defaultValue={this.state.info.secondary_name}
            style={{ border: 'none', textAlign: 'center' }}
            disabled={
              this.props.selectedId !== this.props.info.id ? true : false
            }
          />
        </td>
        <td>
          <input
            type="text"
            ref={this.balanceRef}
            name=""
            defaultValue={this.state.info.balance}
            style={{ border: 'none', textAlign: 'center' }}
            disabled={
              this.props.selectedId !== this.props.info.id ? true : false
            }
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
          {this.props.selectedId !== this.props.info.id ? (
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
