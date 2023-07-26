import React from 'react';
import './FilteredButtons.css';

class FilteredButtons extends React.Component {
  render() {
    return (
      <div className="btn-block">
        <input type="button" value="all" />
        <input type="button" value="active" />
        <input type="button" value="blocked" />
      </div>
    );
  }
}

export default FilteredButtons;
