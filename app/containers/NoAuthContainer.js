import React from 'react';
import HomeView from '../views/HomeView';
import FormTemplateView from '../views/FormTemplateView';
import ResetPasswordForm from '../components/ResetPasswordForm';
import CreateAccountForm from '../components/CreateAccountForm';

const NoAuthContainer = (props) => {
  let view = props.userView;
  let resetPassword = {
    viewName: 'RESET_PASSWORD',
    heading: 'Reset Password',
    success: 'Your password was successfully reset.',
    original: `Enter the email address associated with your account.
      You will be sent a temporary password, use this to log in and
      change your password in the Settings area.`
  };
  let createAccount = {
    viewName: 'CREATE_ACCT',
    heading: 'Create Account',
    success: 'Your account was created successfully!',
    original: `YMN will never share your password with third-parties and
      will only email you if you forget your password and
      want to reset it.`
  };

  return (
    <div>
      {
        view === resetPassword.viewName ?

          <FormTemplateView { ...props }>
            {resetPassword.heading}
            {resetPassword.success}
            {resetPassword.original}
            <ResetPasswordForm {...props} />
          </FormTemplateView> :

          view === createAccount.viewName ?

            <FormTemplateView {...props}>
              {createAccount.heading}
              {createAccount.success}
              {createAccount.original}
              <CreateAccountForm {...props} />
            </FormTemplateView> :

            <HomeView {...props} />
      }
    </div>
  );
};

export default NoAuthContainer;
