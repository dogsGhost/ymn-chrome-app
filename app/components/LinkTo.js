import React from 'react';

const LinkTo = (props) => {
  let classes = ['btn'];
  if (props.style) {
    classes.push(`btn-${props.style}`);
  } else {
    classes.push('btn-primary');
  }
  if (props.size) { classes.push(`btn-${props.size}`); }
  if (props.isFull) { classes.push('btn-full'); }
  if (props.name) { classes.push(`btn-${props.name}`); }
  classes = classes.join(' ');
  return (
    <button
      className={classes}
      onClick={(e) => {
        e.preventDefault();
        props.setView(props.linkTo || '');
      }}
      type="button">
      {props.children}
    </button>
  );
};

export default LinkTo;
