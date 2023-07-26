import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Client from "../Client/Client";
import "./UsersLits.css";

class UsersList extends PureComponent {
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        secondary_name: PropTypes.string,
        balance: PropTypes.number.isRequired,
        // status: PropTypes.string,
      })
    ),
  };

  state = {
    status: "",
  };

  render() {
    console.log("UserList render");
    const usersList = this.props.users.map((item) => {
      return (
        <Client
          key={item.id}
          id={item.id}
          first_name={item.first_name}
          last_name={item.last_name}
          secondary_name={item.secondary_name}
          balance={item.balance}
          status={this.state.status}
        />
      );
    });
    return (
      <>
        {" "}
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
        <input type="button" value="Add user" />
      </>
    );
  }
}

export default UsersList;
