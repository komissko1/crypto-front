import React from "react";

function Form(props) {

  return (
    <form className="form__container" onSubmit={props.onSubmit} noValidate>
      {props.children}
      <button
        type="submit"
        className={`form__submit ${
          props.isFormValid ? "form__submit_active": "form__submit_active link-effect"
        }`}
      >
        {props.buttonText}
      </button>
    </form>
  );
}

export default Form;
