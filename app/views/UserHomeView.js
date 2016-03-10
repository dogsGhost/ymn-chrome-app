import React from 'react';
import ItemList from '../components/ItemList';
import LinkTo from '../components/LinkTo';

const UserHomeView = (props) => (
  <div>
    <div className="section-callout">
      <LinkTo
        linkTo="ADD_ITEM"
        name="addItem"
        setView={props.setView}
        size="lrg"
        isFull="true">
        Add Item
      </LinkTo>
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
