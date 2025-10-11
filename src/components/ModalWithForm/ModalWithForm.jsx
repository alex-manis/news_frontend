import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  buttonText,
  isLoading,
  children,
  extraButton,
}) {
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} className="modal__form" noValidate>
        {children}
        <div className="modal__buttons">
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`modal__submit ${
              !isValid || isLoading ? "modal__submit-disabled" : ""
            }`}
          >
            {isLoading ? "Saving..." : buttonText}
          </button>
          {extraButton && (
            <button
              type="button"
              onClick={extraButton.onClick}
              className="modal__extra-button"
            >
              <span className="modal__extra-button-text">or</span>{" "}
              {extraButton.text}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
