import React from 'react';
import ErrorMessage from '../components/ErrorMessage';

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
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              props.setView('');
            }}
            type="buton">
            Sign In
          </button> :
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
