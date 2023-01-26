import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import { alertText } from "../../utils/content";

function Login(props) {
  const [validatedFields, setValidatedFields] = React.useState({
    email: true,
    password: true,
  });
  const [isFormValid, setIsFormValid] = React.useState(false);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  React.useEffect(() => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }, []);

  const handleFieldChange = (e) => {
    const validatedKeyPare = { [e.target.id]: e.target.checkValidity() };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    setIsFormValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      props.onLogin({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="login">
      <p className="login__title">Welcome!</p>
      <Form
        buttonText="Login"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <label className="form__inputs-box">
          <input
            className="form__input"
            type="email"
            id="email"
            placeholder="E-mail"
            required
            ref={emailRef}
            onChange={handleFieldChange}
            pattern="[a-zA-Z0-9._%+-]+\x40[a-zA-Z0-9.-]+\x2E[a-zA-Z]{2,}"
          />
          <span
            className={`form__input-alert ${
              validatedFields.email ? "" : "form__input-alert_pink"
            }`}
            id="email-alert"
          >
            {alertText.email}
          </span>
        </label>
        <label className="form__inputs-box">
          <input
            className="form__input"
            type="password"
            id="password"
            minLength="3"
            maxLength="20"
            placeholder="Password"
            required
            ref={passwordRef}
            pattern="^[\w!@#\x26()$\x22{%}:;',?*~$^+=<>].*"
            onChange={handleFieldChange}
          />
          <span
            className={`form__input-alert ${
              validatedFields.password ? "" : "form__input-alert_pink"
            }`}
            id="password-alert"
          >
            {alertText.password}
          </span>
        </label>
        <p
          className={`form__submit-alert ${
            props.onLoginError ? "form__submit-alert_active" : ""
          }`}
        >
          {alertText.authorizationError}
        </p>
      </Form>
      <p className="form__bottom-text">
        Not registered?&nbsp;&#8594;&nbsp;
        <Link to="/signup" className="form__bottom-link link-effect">
          Registration
        </Link>
      </p>
    </div>
  );
}

export default Login;
