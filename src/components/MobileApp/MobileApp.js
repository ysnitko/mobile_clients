import React from "react";
import UsersList from "../UsersList/UsersList";
import FilteredButtons from "../FilteredButtons/FilteredButtons";

let users = require("../../users.json");

class MobileApp extends React.PureComponent {
  render() {
    console.log("MobileApp render");
    return (
      <>
        <FilteredButtons />
        <UsersList users={users} />
      </>
    );
  }
}

export default MobileApp;
