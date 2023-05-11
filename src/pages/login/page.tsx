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
  $password,
  $passwordError,
  emailChanged,
  formSubmitted,
  passwordChanged,
} from "./model";

import { EmailIcon, PasswordIcon } from "~/shared/icons";

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
          emailChanged(target.value);
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
          passwordChanged(target.value);
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

export const LoginPage = () => {
  return (
    <div className="auth-page">
      <FormSection
        title={"login"}
        button_text={"submit"}
        submit={formSubmitted}
      >
        <span className="auth-page__additional-info-section">
          If you don't have account:
          <Link to={routes.auth.register}>signup</Link>
        </span>
        <div className="auth-page__form-wrapper">
          <EmailInput />
          <PasswordInput />
        </div>
      </FormSection>
    </div>
  );
};
