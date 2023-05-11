import "./styles.sass";

interface FormSectionDTO {
  title: string;
  children: string | JSX.Element | JSX.Element[];
  submit: () => void;
  button_text: string;
}

export const FormSection = ({ title, children, submit, button_text }: FormSectionDTO) => {
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    submit();
  };

  return (
    <div className="form-wrapper">
      <div className="form-section">
        <span className="form-section__form-title">{title}</span>
        <form onSubmit={onSubmit}>
          <div>{children}</div>

          <button
            className="form-section__submit-button"
            type="submit"
          >
            <span className="form-section__submit-button-text">{button_text}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
