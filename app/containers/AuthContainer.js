import React, { Component } from 'react';
import UserHomeView from '../views/UserHomeView';
import UserAddItemView from '../views/UserAddItemView';
import UserSettingsView from '../views/UserSettingsView';
import Footer from '../layouts/Footer';

const AuthContainer = (props) => {
  let view = props.userView;
  return (
    <div>
      {
        view === 'ADD_ITEM' ?
          <UserAddItemView {...props} /> :
          view === 'SETTINGS' ?
            <UserSettingsView {...props} /> :
            <UserHomeView {...props} />
      }
      {
        props.session ?
          <Footer logOut={props.logOut} setView={props.setView} />:
          false
      }
    </div>
  );
};

export default AuthContainer;
