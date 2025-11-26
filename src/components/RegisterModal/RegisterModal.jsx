import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  isLoading,
  onLoginClick,
  registerError,
  setRegisterError,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerError) setRegisterError("");
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      if (setRegisterError) setRegisterError("");
    }
  }, [isOpen, resetForm, setRegisterError]);

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isLoading={isLoading}
      extraButton={{ text: "Log in", onClick: onLoginClick }}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter your email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          minLength={2}
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <label className="modal__label">
        Username
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Enter your username"
          value={values.name || ""}
          minLength={2}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      {registerError && <p className="modal__error">{registerError}</p>}
    </ModalWithForm>
  );
}

export default RegisterModal;
