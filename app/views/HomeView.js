import React from 'react';
import SignInForm from '../components/SignInForm'
import LinkTo from '../components/LinkTo'

const HomeView = (props) => (
  <div>
    <div className="card">
      <SignInForm {...props} />
    </div>
    <LinkTo linkTo="CREATE_ACCT" setView={props.setView}>
      Create Account
    </LinkTo>
  </div>
);

export default HomeView;
