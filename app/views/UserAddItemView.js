import React from 'react';
import AddItemForm from '../components/AddItemForm';

const UserAddItemView = (props) => (
  <div>
    <div className="section-callout">
      <button
        className="btn btn-alert btn-lrg btn-full"
        onClick={(e) => {
          e.preventDefault();
          props.setView('');
        }}
        type="button">
        Return To List
      </button>
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
