import React from 'react';
import ItemList from '../components/ItemList';

const UserHomeView = (props) => (
  <div>
    <div className="section-callout">
      <button
        className="btn btn-primary btn-full btn-lrg btn-addItem"
        onClick={(e) => {
          e.preventDefault();
          props.setView('ADD_ITEM');
        }}
        type="button">
        Add Item
      </button>
    </div>

    <div className="section-header">
      <h2 className="section-heading">You Might Need</h2>
      {
        props.hiddenItems.length ?
          <button
            className="btn btn-warning btn-full btn-showHidden"
            onClick={props.unhideAll}
            type="button">
            Show Hidden
          </button> :
          false
      }
    </div>

    <ItemList {...props}>
      <li className="card item">
        <p>Nothing today, add items you have bought or check back tomorrow!</p>
      </li>
    </ItemList>
  </div>
);

export default UserHomeView;
