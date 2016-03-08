import React from 'react';

const SignInForm = (props) => (
  <form className="form" method="post" onSubmit={props.authenticateUser}>
    <div className="input-group">
      <label className="input-label" htmlFor="email">Email</label>
      <input
        className="input"
        id="email"
        onChange={props.updateInputValue}
        placeholder="your@email.com"
        required
        type="email"
        value={props.email}
      />
    </div>

    <div className="input-group">
      <label className="input-label" htmlFor="password">Password</label>
      <input
        className="input"
        id="password"
        onChange={props.updateInputValue}
        required
        type="password"
        value={props.password}
      />
      &nbsp;<a href="#" onClick={(e) => {
        e.preventDefault();
        props.setView('RESET_PASSWORD');
      }}>Forget?</a>
    </div>

    <button
      className="btn btn-primary"
      type="submit">
      Sign In
    </button>
  </form>
);

export default SignInForm;
