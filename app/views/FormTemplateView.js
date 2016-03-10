import React from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LinkTo from '../components/LinkTo';

const FormTemplateView = (props) => {
  let success = props.reqSuccess;
  return (
    <div>
      <div className="flat">
        <h2 className="flat-heading">{props.children[0]}</h2>
        { success ? <p>{props.children[1]}</p> : <p>{props.children[2]}</p> }
      </div>
      {
        success ?
          <LinkTo setView={props.setView}>
            Sign In
          </LinkTo> :
          <div className="card">
            <ErrorMessage errorMsg={props.errorMsg} />
            {props.children[3]}
          </div>
      }
      {props.children[4]}
    </div>
  );
}

export default FormTemplateView;
