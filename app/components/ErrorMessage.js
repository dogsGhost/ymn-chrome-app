import React from 'react';

const ErrorMessage = (props) => (
  <div>
    {
      props.errorMsg ?
        <p className="msg msg-error">
          Sorry, there was an error processing your request. {props.errorMsg}
        </p> :
        false
    }
  </div>
);

export default ErrorMessage;
