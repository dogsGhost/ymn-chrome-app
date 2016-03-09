import React from 'react';

const Item = (props) => (
  <li className="card item">
    <h3 className="item-name">{props.item.name}</h3>
    <button
      className="btn btn-primary item-btn1"
      onClick={props.updateItem}
      type="button">
      Bought Today
    </button>
    <button
      className="btn btn-alert item-btn2"
      onClick={() => {
        props.hideItem(props.item.key);
      }}
      type="button">
      Hide
    </button>
  </li>
);

export default Item;
