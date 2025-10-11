import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  isLoading,
  onRegisterClick,
  loginError,
  setLoginError,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (!isOpen) resetForm();
    setLoginError("");
  }, [isOpen, resetForm, setLoginError]);

  const handleInputChange = (e) => {
    handleChange(e);
    if (loginError) setLoginError("");
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText={isLoading ? "Logging in..." : "Sign In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isLoading={isLoading}
      extraButton={{ text: "Sign up", onClick: onRegisterClick }}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleInputChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          minLength={2}
          className="modal__input"
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleInputChange}
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      {loginError && <p className="modal__login-error">{loginError}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
