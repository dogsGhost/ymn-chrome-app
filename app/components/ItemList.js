import React from 'react';
import Item from './Item';
import * as utils from '../utils';

const ItemList = (props) => {
  // filter items that are past avg purchase window
  let items = props.items.filter((item) => {
    // need at least two purchase points
    if (!item.dates || item.dates.length < 2) return false;

    // sort dates newest to oldest
    let dates = utils.sortDatesDesc(item.dates);

    // diff current date and most recent stored date for item
    let daysSince = utils.getCurDate() - new Date(dates[0]);

    // get time between each date
    let diffs = utils.diffDates(dates);

    // average time between dates in days
    let avg = diffs.reduce(utils.sum) / (diffs.length - 1);

    // if num of days between current date and last purchase are greater than
    // or equal to average num of days between purchases, include the item.
    return utils.convertMsToDays(daysSince) >= utils.convertMsToDays(avg);
  });

  // do not include hidden items
  items = items.filter((item) => !props.hiddenItems.includes(item.id));

  let content = items.map((item) => {
    return (
      <Item
        item={item}
        hideItem={props.hideItem}
        key={item.key}
        updateItem={props.updateItem}
      />
    );
  });

  if (!items.length) content = props.children;
  return (
    <ul>
      {content}
    </ul>
  );
};

export default ItemList;
