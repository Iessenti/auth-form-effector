import { useState } from "react";
import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import { FormSection } from "~/shared/ui/FormSection/FormSection";
import { routes } from "~/shared/routing";
import { FormInput } from "~/shared/ui/FormInput/FormInput";

import {
  $email,
  $emailError,
  $formBlocked,
  $name,
  $nameError,
  $password,
  $passwordError,
  emailChanged,
  formSubmitted,
  nameChanged,
  passwordChanged,
} from "./model";

import { EmailIcon, PasswordIcon, PersonIcon } from "~/shared/icons";

const NameInput = () => {
  const [name, nameError, formBlocked] = useUnit([$name, $nameError, $formBlocked]);

  const nameErrorTitles = {
    ["empty"]: "Enter name",
    ["invalid"]: "Strange name",
  };

  return (
    <div className="auth-page__input-section">
      <FormInput
        type="text"
        value={name}
        onChange={(event: UIEvent) => {
          const target = event.target as HTMLInputElement; 
          nameChanged(target.value)
        }}
        icon={<PersonIcon />}
        disabled={formBlocked}
        error={Boolean(nameError)}
        placeholder="enter your name"
      />
      <div className="auth-page__input-error">
        {nameError && nameErrorTitles[nameError]}
      </div>
    </div>
  );
};

const EmailInput = () => {
  const [email, emailError, formBlocked] = useUnit([$email, $emailError, $formBlocked]);

  const emailErrorTitles = {
    ["empty"]: "Enter email",
    ["invalid"]: "Incorrect email",
  };

  return (
    <div className="auth-page__input-section">
      <FormInput
        type="email"
        value={email}
        onChange={(event: UIEvent) => {
          const target = event.target as HTMLInputElement; 
          emailChanged(target.value)
        }}
        icon={<EmailIcon />}
        disabled={formBlocked}
        error={Boolean(emailError)}
        placeholder="enter your email"
      />
      <div className="auth-page__input-error">
        {emailError && emailErrorTitles[emailError]}
      </div>
    </div>
  );
};

const PasswordInput = () => {
  const [password, passwordError, formBlocked] = useUnit([$password, $passwordError, $formBlocked]);

  const passwordErrorTitles = {
    ["empty"]: "Enter password",
    ["invalid"]: "Password must be 6 symbols at least",
  };

  const [isPassword, setIsPassword] = useState(true);

  const toggleIsPassword = () => setIsPassword(!isPassword);

  return (
    <div className="auth-page__input-section">
      <FormInput
        type={isPassword ? "password" : "text"}
        value={password}
        onChange={(event: UIEvent) => {
          const target = event.target as HTMLInputElement; 
          passwordChanged(target.value)
        }}
        icon={<PasswordIcon rotate={isPassword} />}
        disabled={formBlocked}
        onIconClicked={toggleIsPassword}
        error={Boolean(passwordError)}
        placeholder="enter the password"
      />
      <div className="auth-page__input-error">
        {passwordError && passwordErrorTitles[passwordError]}
      </div>
    </div>
  );
};

export const SignupPage = () => {
  return (
    <div className="auth-page">
      <FormSection
        title={"signup"}
        button_text={"submit"}
        submit={formSubmitted}
      >
        <span className="auth-page__additional-info-section">
          If you already have account:
          <Link to={routes.auth.login}>login</Link>
        </span>
        <div
          className="auth-page__form-wrapper"
        >
          <NameInput />
          <EmailInput />
          <PasswordInput />
        </div>
      </FormSection>
    </div>
  );
};
