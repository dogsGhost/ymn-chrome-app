import React from 'react';

const CreateAccountForm = (props) => (
  <form className="form" method="post" onSubmit={props.createAccount}>
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
    </div>

    <button type="submit" className="btn btn-primary">Create Account</button>
  </form>
);

export default CreateAccountForm;
