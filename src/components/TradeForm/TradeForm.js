import React from "react";
import Form from "../Form/Form";

function TradeForm() {
  return (
    <div className="tradeForm">
      <p className="tradeForm__title">Trade</p>
      <Form buttonText="Confirm transaction">
        <div className="form__inputs-box">
          <label className="form__inputs">
            <input
              className="form__input"
              type="text"
              id="currency1"
              minLength="3"
              maxLength="50"
              placeholder="0"
              required
            ></input>
            <button className="form__droplist-button" type="button">
              ETH&nbsp;&#9013;
            </button>
          </label>
          <span className="form__input-alert" id="currency1-alert">
            Not enough funds
          </span>
        </div>

        <div className="form__swap-box">
          <button className="form__swap-button" type="button">
            &#8645;
          </button>
        </div>

        <div className="form__inputs-box">
          <div className="form__inputs">
            <input
              className="form__input"
              type="text"
              id="currency1"
              minLength="3"
              maxLength="50"
              placeholder="0"
              required
            ></input>
            <button className="form__droplist-button" type="button">
              ETH&nbsp;&#9013;
            </button>
          </div>
          <span className="form__input-alert" id="currency2-alert">
            Not enough funds
          </span>
        </div>

        <div className="form__currency-box">
          <p className="form__rate">1 ETH = 21.267 AAVE</p>
        </div>
      </Form>
    </div>
  );
}

export default TradeForm;
