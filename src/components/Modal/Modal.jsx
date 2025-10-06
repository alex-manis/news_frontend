import useModalClose from "../../hooks/useModalClose";
import "./Modal.css";

export const Modal = ({ isOpen, onClose, children, type }) => {
  useModalClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className={`modal__content ${
          type ? `modal__content_type_${type}` : ""
        }`}
      >
        {children}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
};
