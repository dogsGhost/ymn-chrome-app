import React from 'react';
import Item from './Item';

const ItemList = (props) => {
  return (
    <ul>
      <Item updateItem={props.updateItem} hideItem={props.hideItem} />
      {props.children}
    </ul>
  );
};

export default ItemList;
