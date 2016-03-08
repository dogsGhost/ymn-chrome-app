import React from 'react';

const Header = (props) => {
  // render() {
    let headerText =
      props.session ?
        `${props.session.password.email} | YMN` :
        'You Might Need';

    return (
      <header className="page-header">
        <div className="inner">
          <h1 className="site-heading">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              props.setView('');
            }}>{headerText}</a>
          </h1>
        </div>
      </header>
    );
  // }
};

export default Header;
