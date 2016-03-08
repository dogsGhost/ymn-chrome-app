import React from 'react';
import SignInForm from '../components/SignInForm'

const HomeView = (props) => (
  <div>
    <div className="card">
      <SignInForm {...props} />
    </div>
    <button
      className="btn btn-primary"
      onClick={() => { props.setView('CREATE_ACCT'); }}
      type="button">
      Create Account
    </button>
  </div>
);

export default HomeView;
