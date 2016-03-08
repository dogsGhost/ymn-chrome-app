import React from 'react';

const ResetPasswordForm = (props) => (
  <form className="form" method="post" onSubmit={props.resetPassword}>
    <div className="input-group">
      <label
        className="input-label"
        htmlFor="email">
        Your Email
      </label>
      <input
        className="input"
        id="email"
        onChange={props.updateInputValue}
        required
        type="email"
        value={props.email}
      />
    </div>
    <button className="btn btn-primary" type="submit">Reset Password</button>
  </form>
);

export default ResetPasswordForm;
