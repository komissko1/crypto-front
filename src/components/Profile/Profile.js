import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Form from "../Form/Form";
import { alertText } from "../../utils/content";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [validatedFields, setValidatedFields] = React.useState({
    name: true,
    email: true,
  });
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isResultVisible, setIsResultVsisble] = React.useState(false);
  const nameRef = React.useRef();
  const emailRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = currentUser.name;
    emailRef.current.value = currentUser.email;
  }, []);

  const handleFieldChange = (e) => {
    const validatedKeyPare = { [e.target.id]: e.target.checkValidity() };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    if (
      nameRef.current.value === currentUser.name &&
      emailRef.current.value === currentUser.email
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(e.target.closest("form").checkValidity());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      props.onUserUpdate({
        name: nameRef.current.value,
        email: emailRef.current.value,
      });
      setIsResultVsisble(true);
    }
  };

  return (
    <div className="profile">
      <p className="profile__title">{`Hi, ${currentUser.name}!`}</p>
      <Form
        buttonText="Save changes"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
          <label className="form__inputs-box">
            Name
            <input
              className="form__input"
              type="text"
              id="name"
              minLength="3"
              maxLength="50"
              placeholder="name"
              required
              ref={nameRef}
              onChange={handleFieldChange}
            />
          </label>
          <span
            className={`form__input-alert ${
              validatedFields.name ? "" : "form__input-alert_pink"
            }`}
            id="name-alert"
          >
            {alertText.name}
          </span>
          <label className="form__inputs-box">
            E-mail
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
          </label>
          <span
            className={`form__input-alert ${
              validatedFields.email ? "" : "form__input-alert_pink"
            }`}
            id="email-alert"
          >
            {alertText.email}
          </span>
          <p
            className={`form__submit-alert ${
              isResultVisible ? "form__submit-alert_active" : ""
            }`}
          >
            {props.onUpdateError
              ? alertText.serverError
              : alertText.profileUpdated}
          </p>
      </Form>
      <p className="form__bottom-text">
        Log out before leaving! &nbsp;
      <Link
        to="/logout"
        className="form__bottom-link link-effect"
        onClick={props.onLogout}
      >
        Log out
      </Link>
      </p>
    </div>
  );
}

export default Profile;
