import React from 'react';
import AddItemForm from '../components/AddItemForm';
import LinkTo from '../components/LinkTo';

const UserAddItemView = (props) => (
  <div>
    <div className="section-callout">
      <LinkTo
        setView={props.setView}
        size="lrg"
        style="alert"
        isFull="true">
        Return To List
      </LinkTo>
    </div>


    <div className="section-header">
      <h2 className="section-heading">Add Item</h2>
    </div>
    <div className="card view-addItem">
      <AddItemForm {...props} />
    </div>
  </div>
);

export default UserAddItemView;
