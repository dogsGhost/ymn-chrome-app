import React, { Component } from 'react';
import Rebase from 're-base';
import Header from '../layouts/Header';
import AuthContainer from './AuthContainer';
import NoAuthContainer from './NoAuthContainer';
import { filterMatches, normalizeDateString } from '../utils';

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

  componentWillUnmount() {
    base.removeBinding(this.syncRef);
  }

  componentWillMount() {
    this._syncAuth();
    // TODO: move this so it fires every time UserAddItemView is mounted
    let date = normalizeDateString(new Date());
    this.setState({
      itemDate: date,
      curDate: date
    });
  }

  componentDidMount() {
    this._syncItems();
  }

  _syncAuth() {
    this.setState({
      session: base.getAuth() || false
    });
  }

  _sync() {
    this._syncAuth();
    this._syncItems();
  }

  _syncItems() {
    if (this.state.session) {
      this.syncRef = base.syncState('items', {
        context: this,
        state: 'items',
        asArray: true,
        queries: {
          orderByChild: 'userId',
          equalTo: this.state.session.uid
        }
      });
    }
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
        // set session
        this._sync();
      } else {
        // error handling
        this._setErrorMsg(res.message);
      }
    });
  }

  _handleAddItem(e) {
    e.preventDefault();
    let date = this.state.itemDate;
    let name = this.state.itemName;
    let items = this.state.items;

    // check if item has already been added
    let matchingItems = utils.filterMatches(name, items, 'name');
    // if yes
    if (matchingItems.length) {
      let match = matchingItems[0];
      // we only need to update if the date hasn't already been added
      if (!match.dates.includes(date)) {
        this._handleItemUpdate(date, match, items);
      }
    } else {
      this._createItem(name, date, items);
    }
  }

  _handleItemUpdate(date, matchingItem, items) {
    if (!items) { throw 'error in _handleItemUpdate'; }
    console.info('update item');
    // get index of item we need to update
    let index = items.indexOf(matchingItem);
    // copy the item and add the new date to the copy
    let dupItem = Object.assign({}, matchingItem);
    dupItem.dates.push(date);
    // replace the item with the copy
    this.setState({
      items: [
        ...items.slice(0, index),
        dupItem,
        ...items.slice(index + 1)
      ]
    })
  }

  _createItem(name, date, items) {
    // item does not already exist
    let newItem = {
      dates: [date],
      name,
      userId: this.state.session.uid
    };
    // since our data is sync'd with firebase we just update our state
    this.setState({
      items: [...items, newItem],
      itemName: ''
    });
    console.info('add new item');
  }

  _handleHideItem(id) {
    console.log('hide item');
    this.setState({
      hiddenItems: [...this.state.hiddenItems, id]
    });
  }

  _handleUnhideAllItems() {
    console.log('unhide all items');
    this.setState({ hiddenItems: [] });
  }

  _logOutUser() {
    base.unauth();
    this._syncAuth();
    base.removeBinding(this.syncRef);
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
