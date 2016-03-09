import React, { Component } from 'react';
import Rebase from 're-base';
import Header from '../layouts/Header';
import AuthContainer from './AuthContainer';
import NoAuthContainer from './NoAuthContainer';
import { normalizeDateString } from '../utils';

let base = Rebase.createClass('https://ymn-react.firebaseio.com');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // session object from firebase
      session: false,
      // user items from firebase
      items: [],

      // ids of items in item list user has temporarily hidden
      hiddenItems: [],
      // name of new item via add-item form
      itemName: '',

      // value of date field in add-item form
      itemDate: '',
      // max date value for `itemDate`
      curDate: '',

      // email value for various fields in non-auth views
      email: '',
      // password value for various fields in non-auth views
      password: '',
      // the current view the user is on
      userView: '',
      // when a request is successful
      reqSuccess: false,
      // when a request returns an error
      errorMsg: ''
    };
  }

  componentWillMount() {
    this._syncAuth();
  }

  componentDidMount() {
    if (this.state.session) {
      base.syncState('items', {
        context: this,
        state: 'items',
        asArray: true,
        queries: {
          orderByChild: 'userId',
          equalTo: this.state.session.uid
        }
      });
    }

    // TODO: move this so it fires every time UserAddItemView is mounted
    this.setState({
      curDate: normalizeDateString(new Date())
    });
  }

  _syncAuth() {
    this.setState({
      session: base.getAuth() || false
    });
  }

  _handleViewChange(val) {
    if (typeof val !== 'string') {
      throw '_handleViewChange param is not string';
    }
    // set new view value and reset other states
    this.setState({
      userView: val,
      email: '',
      password: '',
      reqSuccess: false,
      errorMsg: ''
    });
  }

  _handleInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  _setErrorMsg(message) {
    this.setState({ errorMsg: message });
  }

  _handleResetPassword(e) {
    e.preventDefault();
    this.setState({ errorMsg: '' });
    base.resetPassword(
      { email: this.state.email },
      this._formCallback.bind(this)
    );
  }

  _handleCreateAccount(e) {
    e.preventDefault();
    this.setState({ errorMsg: '' });
    base.createUser(
      { email: this.state.email, password: this.state.password },
      this._formCallback.bind(this)
    );
  }

  _formCallback(res) {
    // no response means password was successfully reset
    if (!res) {
      this.setState({ reqSuccess: true });
    } else {
      // error handling
      this._setErrorMsg(res.message);
    }
  }

  _handleSignIn(e) {
    e.preventDefault();
    base.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, (res) => {
      // no response means auth was successful
      if (!res) {
        this._syncAuth();
        let item = Object.assign({}, this.state.item, {
          userId: this.state.session.uid
        });
        this.setState({ item });
      } else {
        // error handling
        this._setErrorMsg(res.message);
      }
    });
  }

  _handleAddItem() {
    console.log('adding item');

    let newItem = {
      userId: this.state.session.uid,
      name: this.state.itemName,
      dates: [this.state.itemDate]
    };

    // check if item has already been added
    // if yes
      //check if `itemDate` already exists in `item.dates`
        // if no, update item
    // if no
      // add `itemDate` to `item.dates` array
  }

  _handleItemUpdate() {
    console.log('update item');
  }

  _handleHideItem(id) {
    console.log('hide item');
    this.setState({
      hiddenItems: this.state.hiddenItems.concat([id])
    });
  }

  _handleUnhideAllItems() {
    console.log('unhide all items');
  }

  _logOutUser() {
    base.unauth();
    this._syncAuth();
    this._handleViewChange('');
  }

  render() {
    return (
      <div>
        <Header
          setView={this._handleViewChange.bind(this)}
          session={this.state.session}
        />

        <div className="inner content-wrapper">
          {
            this.state.session ?
              <AuthContainer
                {...this.state}
                addItem={this._handleAddItem.bind(this)}
                hideItem={this._handleHideItem.bind(this)}
                logOut={this._logOutUser.bind(this)}
                setView={this._handleViewChange.bind(this)}
                unhideAll={this._handleUnhideAllItems.bind(this)}
                updateInputValue={this._handleInputChange.bind(this)}
                updateItem={this._handleItemUpdate.bind(this)}
              /> :
              <NoAuthContainer
                {...this.state}
                authenticateUser={this._handleSignIn.bind(this)}
                createAccount={this._handleCreateAccount.bind(this)}
                resetPassword={this._handleResetPassword.bind(this)}
                setView={this._handleViewChange.bind(this)}
                updateInputValue={this._handleInputChange.bind(this)}
              />
          }
        </div>
      </div>
    );
  }
}
