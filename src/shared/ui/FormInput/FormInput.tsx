import { ReactElement } from "react";
import "./styles.sass";

interface FormInputDTO {
  type: string;
  value: string;
  onChange: (event: UIEvent) => void;
  icon: ReactElement;
  disabled: boolean;
  onIconClicked?: () => void;
  error?: boolean;
  placeholder: string;
}

export const FormInput = ({
  type,
  value,
  onChange,
  icon,
  disabled,
  onIconClicked,
  error,
  placeholder,
}: FormInputDTO) => {
  return (
    <div className="form-input">
      <div
        className={`form-input__icon-wrapper
          ${error && "error-icon-state"}
        `}
        onClick={onIconClicked}
      >
        {icon}
      </div>

      <input
        type={type}
        value={value}
        // @ts-ignore
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};
