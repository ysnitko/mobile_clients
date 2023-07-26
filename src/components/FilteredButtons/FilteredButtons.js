import React from "react";

class FilteredButtons extends React.Component {
  render() {
    return (
      <>
        <input type="button" value="all" />
        <input type="button" value="active" />
        <input type="button" value="blocked" />
      </>
    );
  }
}

export default FilteredButtons;
