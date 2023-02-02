import React from "react";
import Form from "../Form/Form";
import { alertText } from "../../utils/content";

function TradeForm(props) {
  const [currency, setСurrency] = React.useState({});
  const [rates, setRates] = React.useState({});
  const [validatedFields, setValidatedFields] = React.useState({
    amount1: true,
    amount2: true
  });
  const [isFormValid, setIsFormValid] = React.useState(false);

  const amount1Ref = React.useRef();
  const amount2Ref = React.useRef();

  // Re-render upon update of currency pair or rates
  React.useEffect(() => {
    setСurrency({ cur1: props.activePair.cur1, cur2: props.activePair.cur2 });
    setRates({
      cur1: props.activeRates.cur1,
      cur2: props.activeRates.cur2,
      cros: props.activeRates.cur1 / props.activeRates.cur2
    });
    amount2Ref.current.value = calculateInputValue({
      value: amount1Ref.current.value,
      rate: rates.cur2 / rates.cur1
    })
  }, [props.activePair, props.activeRates]);

  // Automation of filling incative input value and form validation
  const handleFieldChange = e => {
    e.target.id === "amount1"
      ? (amount2Ref.current.value = calculateInputValue({
          value: amount1Ref.current.value,
          rate: rates.cur1 / rates.cur2
        }))
      : (amount1Ref.current.value = calculateInputValue({
          value: amount2Ref.current.value,
          rate: rates.cur2 / rates.cur1
        }));
    const validatedKeyPare = { [e.target.id]: e.target.checkValidity() };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    setIsFormValid(e.target.closest("form").checkValidity());
  };

  function calculateInputValue({ value, rate }) {
    const calcAmount = Number(value * rate);
    const fractionLength =
      ("" + Math.trunc(calcAmount)).length > 9
        ? 0
        : 9 - ("" + Math.trunc(calcAmount)).length;
    return calcAmount === 0 ? "" : calcAmount.toFixed(fractionLength);
  }

// Handle currency swap button
  function swapValues() {
    [amount1Ref.current.value, amount2Ref.current.value] = [
      amount2Ref.current.value,
      amount1Ref.current.value
    ];
    props.onSwap({ cur1: currency.cur2, cur2: currency.cur1 });
  }

// Handle transaction submit
  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid) {
      props.onTransactionSubmit({
        cur1: currency.cur1,
        amount1: Number(amount1Ref.current.value),
        cur2: currency.cur2,
        amount2: Number(amount2Ref.current.value),
        walletId: props.wallet._id,
      });
    }
  };

  return (
    <div className="tradeForm">
      <p className="tradeForm__title">Trade</p>
      <Form
        buttonText="Confirm transaction"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <div className="form__inputs-box">
          <label className="form__inputs">
            <input
              className="form__input"
              type="text"
              id="amount1"
              pattern="^(0|[1-9]\d*)([.]\d+)?"
              maxLength="10"
              placeholder="0"
              required
              ref={amount1Ref}
              onChange={handleFieldChange}
            ></input>

            <button
              className="form__droplist-button"
              id="cur1"
              type="button"
              onClick={props.openPopup}
            >
              {currency.cur1}&nbsp;&#9013;
            </button>
          </label>
          <span
            className={`form__input-alert ${
              !rates ? "" : "form__input-alert_pink"
            }`}
            id="currency1-alert"
          >
            {`${
              !rates ? "Not enough funds" : `USD/${currency.cur1}=${rates.cur1}`
            }`}
          </span>
        </div>

        <div className="form__swap-box">
          <button
            className="form__swap-button"
            type="button"
            onClick={swapValues}
          >
            &#8645;
          </button>
        </div>

        <div className="form__inputs-box">
          <div className="form__inputs">
            <input
              className="form__input"
              type="text"
              id="amount2"
              pattern="^(0|[1-9]\d*)([.]\d+)?"
              maxLength="10"
              placeholder="0"
              required
              ref={amount2Ref}
              onChange={handleFieldChange}
            ></input>
            <button
              className="form__droplist-button"
              id="cur2"
              type="button"
              onClick={props.openPopup}
            >
              {currency.cur2}&nbsp;&#9013;
            </button>
          </div>
          <span
            className={`form__input-alert ${
              !props.activeRates ? "" : "form__input-alert_pink"
            }`}
            id="currency2-alert"
          >
            {!props.activeRates
              ? "Not enough funds"
              : `USD/${currency.cur2}=${rates.cur2}`}
          </span>
        </div>

        <div className="form__currency-box">
          <p className="form__rate">{`1 ${currency.cur1} = ${String(
            rates.cros
          ).slice(0, 8)} ${currency.cur2}`}</p>
        </div>

        <p
          className={`form__submit-alert ${
            props.onTransactionSubmitError ? "form__submit-alert_active" : ""
          }`}
        >
          {alertText.transactionError}
        </p>
      </Form>
    </div>
  );
}

export default TradeForm;
