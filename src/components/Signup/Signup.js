import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import InfoPopup from "../InfoPopup/InfoPopup";
import { alertText } from "../../utils/content";

function Signup(props) {
  const [validatedFields, setValidatedFields] = React.useState({
    name: true,
    email: true,
    password: true,
  });
  const [isFormValid, setIsFormValid] = React.useState(false);
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = "";
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
      props.onSignup({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <>
    {props.infoPopupState.isError && (
        <InfoPopup
          message={alertText.serverError}
          imgType={false}
          onClose={props.onInfoPopupClose}
        />
      ) }
    <div className="signup">
      <p className="signup__title">Register and trade!</p>
      <Form
        buttonText="Sign up"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <label className="form__inputs-box">
          <input
            className="form__input"
            type="text"
            id="name"
            minLength="3"
            maxLength="50"
            placeholder="Username"
            required
            ref={nameRef}
            onChange={handleFieldChange}
          />
          <span
            className={`form__input-alert ${
              validatedFields.name ? "" : "form__input-alert_pink"
            }`}
            id="name-alert"
          >
            {alertText.name}
          </span>
        </label >
        <label className="form__inputs-box">
          <input
            className="form__input"
            type="email"
            id="email"
            placeholder="E-mail"
            required
            ref={emailRef}
            pattern='[a-zA-Z0-9._%+-]+\x40[a-zA-Z0-9.-]+\x2E[a-zA-Z]{2,}'
            onChange={handleFieldChange}
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
      </Form>
      <p className="form__bottom-text">
        Already registered?&nbsp;
        <Link to="/login" className="form__bottom-link link-effect">
          Login
        </Link>
      </p>
    </div>
    </>
  );
}

export default Signup;
