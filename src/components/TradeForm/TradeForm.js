import React from "react";
import Form from "../Form/Form";
import { alertText } from "../../utils/content";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function TradeForm(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [currencyPair, setСurrencyPair] = React.useState(props.activePair);
  const [currencyPairRates, setСurrencyPairRates] = React.useState({
    rate1: 0,
    rate2: 0
  });
  const [validatedFields, setValidatedFields] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);

  const amount1Ref = React.useRef();
  const amount2Ref = React.useRef();

  // Render component when currency pair changes
  React.useEffect(() => {
    // Fetches currency rates for new currency pair
    async function getRates(name1, name2) {
      const rate1 = await props.getRate(name1);
      const rate2 = await props.getRate(name2);
      setСurrencyPairRates({ rate1, rate2 });
      setСurrencyPair({ name1, name2 });
    }

    getRates(props.activePair.name1, props.activePair.name2);

    if (amount2Ref.current.value) {
      amount1Ref.current.value = amount2Ref.current.value;
      amount2Ref.current.value = calculateInputValue({
        value: amount1Ref.current.value,
        rate: currencyPairRates.rate2 / currencyPairRates.rate1
      });
    }
  }, [props.activePair]);

  // Automation of filling incative input value and form validation
  const handleFieldChange = e => {
    // Check if input value is a number
    const validateInput1 = typeof Number(amount1Ref.current.value);
    const validateInput2 = typeof Number(amount2Ref.current.value);
    const alertInput1 = `USD/${currencyPair.name1}=${currencyPairRates.rate1}`;
    const alertInput2 = `USD/${currencyPair.name2}=${currencyPairRates.rate2}`;

    if (props.wallet) {
      // Сделать через кейсы
      alertInput1 = Number(amount1Ref.current.value) >
        props.wallet[`${currencyPair.name1}`] ? "Not enough funds" : (alertInput1 ||)
      const alertInput1 = validateInput1
      ? `USD/${currencyPair.name1}=${currencyPairRates.rate1}`
      : "Value is not a number";
      const alertInput2 = validateInput2
      ? `USD/${currencyPair.name1}=${currencyPairRates.rate2}`
      : "Value is not a number";
    } else {}
    }
    // Check if entered amount exists in users wallet

    // && validateInput1) {
    //   const alertInput1 = Number(amount1Ref.current.value) >
    //   props.wallet[`${currencyPair.name1}`] ? "Not enough funds" : ""}

    Number(amount1Ref.current.value) > props.wallet[`${currencyPair.name1}`];
    // Autofill inactive input
    e.target.id === "amount1"
      ? (amount2Ref.current.value = calculateInputValue({
          value: amount1Ref.current.value,
          rate: currencyPairRates.rate1 / currencyPairRates.rate2
        }))
      : (amount1Ref.current.value = calculateInputValue({
          value: amount2Ref.current.value,
          rate: currencyPairRates.rate2 / currencyPairRates.rate1
        }));

    const validatedKeyPare = {
      [e.target.id]: e.target.id === "amount1" ? validateInput1 : validateInput2
    };

    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    setIsFormValid(e.target.closest("form").checkValidity());
  };

  function calculateInputValue({ value, rate }) {
    if (!value) {
      return "";
    } else {
      const calcAmount = value * rate;
      const fractionLength =
        ("" + Math.trunc(calcAmount)).length > 9
          ? 0
          : 9 - ("" + Math.trunc(calcAmount)).length;
      return calcAmount.toFixed(fractionLength);
    }
  }

  // Handle currency swap button
  async function swapValues() {
    props.onPairChange([currencyPair.name2, currencyPair.name1]);
  }

  // Handle transaction submit
  const handleSubmit = e => {
    e.preventDefault();
    console.log(props.wallet._id);
    if (isFormValid) {
      props.onTransactionSubmit({
        name1: currencyPair.name1,
        amount1: Number(amount1Ref.current.value),
        name2: currencyPair.name2,
        amount2: Number(amount2Ref.current.value),
        walletId: props.wallet._id
      });
    }
  };

  console.log(props.activePair);

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
              {currencyPair.name1}&nbsp;&#9013;
            </button>
          </label>
          <span
            className={`form__input-alert ${
              Number(amount1Ref.current.value) >
                props.wallet[`${currencyPair.name1}`] ||
              typeof Number(amount1Ref.current.value) !== "number"
                ? "form__input-alert_orange"
                : "form__input-alert_pink"
            }`}
            id="currency1-alert"
          >
            {`${
              Number(amount1Ref.current.value) >
              props.wallet[`${currencyPair.name1}`]
                ? typeof Number(amount1Ref.current.value) !== "number"
                  ? "Value is not a number"
                  : "Not enough funds"
                : `USD/${currencyPair.name1}=${currencyPairRates.rate1}`
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
              {currencyPair.name2}&nbsp;&#9013;
            </button>
          </div>
          <span
            className={`form__input-alert ${
              !currencyPair ? "" : "form__input-alert_pink"
            }`}
            id="currency2-alert"
          >
            {!currencyPair
              ? "Not enough funds"
              : `USD/${currencyPair.name2}=${currencyPairRates.rate2}`}
          </span>
        </div>

        <div className="form__currency-box">
          <p className="form__rate">{`1 ${currencyPair.name1} = ${String(
            currencyPairRates.rate1 / currencyPairRates.rate2
          ).slice(0, 8)} ${currencyPair.name2}`}</p>
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
