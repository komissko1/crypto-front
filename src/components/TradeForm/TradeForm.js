import React from "react";
import Form from "../Form/Form";
import { alertText } from "../../utils/content";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function TradeForm(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [currency, setСurrency] = React.useState({
    name1: "BTC",
    name2: "USDT",
    rate1: "",
    rate2: ""
  });
  const [validatedFields, setValidatedFields] = React.useState({
    amount1: true,
    amount2: true
  });
  const [isFormValid, setIsFormValid] = React.useState(false);

  const amount1Ref = React.useRef();
  const amount2Ref = React.useRef();

  // Initial render
  React.useEffect(() => {
    if (!props.activePair.name1 || props.activePair.name1 === "") {
      props.getCurrencyRates([currency.name1, currency.name2]);
    }
  }, []);

  // Re-render upon update of currency pair or rates
  React.useEffect(() => {
    setСurrency(props.activePair);
    amount2Ref.current.value = calculateInputValue({
      value: amount1Ref.current.value,
      rate: props.activePair.rate1 / props.activePair.rate2
    });
  }, [props.activePair]);

  // Automation of filling incative input value and form validation
  const handleFieldChange = e => {
    e.target.id === "amount1"
      ? (amount2Ref.current.value = calculateInputValue({
          value: amount1Ref.current.value,
          rate: currency.rate1 / currency.rate2
        }))
      : (amount1Ref.current.value = calculateInputValue({
          value: amount2Ref.current.value,
          rate: currency.rate2 / currency.rate1
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
    props.getCurrencyRates([currency.name2, currency.name1]);
  }

  // Handle transaction submit
  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid) {
      props.onTransactionSubmit({
        name1: currency.name1,
        amount1: Number(amount1Ref.current.value),
        name2: currency.name2,
        amount2: Number(amount2Ref.current.value),
        walletId: props.wallet._id
      });
    }
  };

  return (
    <div className="tradeForm">
      <p className="tradeForm__title">Trade SIMULATION</p>
      <Form
        buttonText="Confirm transaction"
        onSubmit={handleSubmit}
        isFormValid={currentUser.name && isFormValid}
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
              {currency.name1}&nbsp;&#9013;
            </button>
          </label>
          <span
            className={`form__input-alert ${
              !currency ? "" : "form__input-alert_pink"
            }`}
            id="currency1-alert"
          >
            {`${
              !currency
                ? "Not enough funds"
                : `USD/${currency.name1}=${currency.rate1}`
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
              {currency.name2}&nbsp;&#9013;
            </button>
          </div>
          <span
            className={`form__input-alert ${
              !currency ? "" : "form__input-alert_pink"
            }`}
            id="currency2-alert"
          >
            {!currency
              ? "Not enough funds"
              : `USD/${currency.name2}=${currency.rate2}`}
          </span>
        </div>

        <div className="form__currency-box">
          <p className="form__rate">{`1 ${currency.name1} = ${String(
            currency.rate1 / currency.rate2
          ).slice(0, 8)} ${currency.name2}`}</p>
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
