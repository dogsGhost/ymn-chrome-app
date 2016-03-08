import React from 'react';

const Footer = (props) => (
  <div className="page-footer">
    <button
      className="btn btn-warning btn-sm"
      onClick={(e) => {
        e.preventDefault();
        props.setView('SETTINGS');
      }}
      type="button">
      Settings
    </button>
    &nbsp;
    <button
      className="btn btn-warning btn-sm"
      onClick={props.logOut}
      type="button">
      Log Out
    </button>
  </div>
);

export default Footer;
