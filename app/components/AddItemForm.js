import React from 'react';
import AutoSuggest from './AutoSuggest';

const AddItemForm = (props) => (
  <form className="form" method="post" onSubmit={props.addItem}>
    <div className="input-group">
      <label className="input-label" htmlFor="itemName">Name</label>
      <div className="input-autocomplete">
        <input
          autoComplete="off"
          className="input"
          id="itemName"
          onChange={props.updateInputValue}
          placeholder="item name"
          required
          type="text"
          value={props.itemName}
        />
        <AutoSuggest items={props.items} itemName={props.itemName} />
      </div>
    </div>

    <div className="input-group">
      <label className="input-label" htmlFor="itemDate">Purchase Date</label>
      <input
        className="input"
        id="itemDate"
        max={props.curDate}
        onChange={props.updateInputValue}
        required
        type="date"
        value={props.itemDate}
      />
    </div>

    <button
      className="btn btn-primary"
      type="submit">
      Add Item
    </button>
  </form>
);

export default AddItemForm;
