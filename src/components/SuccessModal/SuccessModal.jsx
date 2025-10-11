import { Modal } from "../Modal/Modal";
import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, onLoginClick }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="success-modal__content">
        <p className="success-modal__title">
          Registration successfully completed!
        </p>
        <button
          type="button"
          className="success-modal__button"
          onClick={onLoginClick}
        >
          Sign in
        </button>
      </div>
    </Modal>
  );
}

export default SuccessModal;
