import React from "react";
import PropTypes from "prop-types";
import "./Client.css";

class Client extends React.Component {
  static propTypes = {
    info: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      secondary_name: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
    delClient: PropTypes.func.isRequired,
    editClient: PropTypes.func.isRequired,
  };

  state = {
    balance: this.props.info.balance,
    status: this.props.info.balance >= 0 ? "active" : "blocked",
  };

  componentDidUpdate = (oldProps, oldState) => {
    console.log(
      "MobileClient id=" + this.props.info.id + " componentDidUpdate"
    );
    if (this.props.info.balance !== this.state.balance)
      this.setState({ balance: this.props.info.balance });
  };

  shouldComponentUpdate = (newProps, newState) => {
    console.log("Client id=" + this.props.info.id + " shouldComponentUpdate");
    return (
      newProps.first_name === this.props.info.first_name ||
      newProps.balance === this.state.balance ||
      newProps.last_name === this.props.info.last_name ||
      newProps.secondary_name === this.props.info.secondary_name
    );
  };

  render() {
    console.log(
      "Client id=" +
        this.props.info.id +
        " render " +
        this.props.info.first_name +
        " " +
        this.props.info.last_name +
        " " +
        this.props.info.secondary_name +
        " " +
        this.state.balance
    );
    return (
      <tr className="User">
        <td> {this.props.info.first_name}</td>
        <td> {this.props.info.last_name}</td>
        <td> {this.props.info.secondary_name}</td>
        <td> {this.props.info.balance}</td>
        <td
          style={
            this.props.info.balance >= 0
              ? { backgroundColor: "green" }
              : { backgroundColor: "darkred" }
          }
        >
          {this.state.status}
        </td>
        <td>
          <input
            className="edit-del-btn"
            type="button"
            value="Edit"
            onClick={() => this.props.editClient(this.props.info.id)}
          />
        </td>
        <td>
          <input
            className="edit-del-btn"
            type="button"
            value="Delete"
            onClick={() => this.props.delClient(this.props.info.id)}
          />
        </td>
      </tr>
    );
  }
}

export default Client;
