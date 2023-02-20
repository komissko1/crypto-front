import React from "react";
import Form from "../Form/Form";
import { alertText } from "../../utils/content";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function TradeForm(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [currencyPair, setСurrencyPair] = React.useState(props.activePair);
  const [currencyPairRates, setСurrencyPairRates] = React.useState({
    rate1: 0,
    rate2: 0,
  });
  const [validatedInputs, setValidatedInputs] = React.useState({
    amount1: { valid: true, alert: "" },
    amount2: { valid: true, alert: "" },
  });
  const [isFormValid, setIsFormValid] = React.useState();

  const amount1Ref = React.useRef();
  const amount2Ref = React.useRef();

  const regexp = /^((0|[1-9]\d*)([.]\d+)?)$/;

  // Render component when currency pair changes
  React.useEffect(() => {
    // Fetches currency rates for new currency pair
    async function getRates(name1, name2) {
      setСurrencyPair({ name1, name2 });
      const rate1 = await props.getRate(name1);
      const rate2 = await props.getRate(name2);
      setСurrencyPairRates({ rate1, rate2 });
    }

    getRates(props.activePair.name1, props.activePair.name2);
    // Automation of filling inputs after change of the currency pair
    if (amount2Ref.current.value) {
      amount2Ref.current.value = calculateInputValue({
        value: amount1Ref.current.value,
        rate: currencyPairRates.rate2 / currencyPairRates.rate1,
      });
    }
  }, [props.activePair]);

  // Automation of filling inactive input value and form validation
  const handleFieldChange = (e) => {
    // Function validating all inputs in the Trading form
    function validateInputs(inputs) {
      const validatedFields = validatedInputs;
      inputs.forEach((item, index) => {
        // Checking values valididty and availability of funds in the wallet
        const currencyName = currencyPair[`name${index + 1}`];
        if (regexp.test(item.value) || item.value === "") {
          currentUser.name && index === 0
            ? Number(item.value) < Number(props.wallet.currencies[currencyName])
              ? (validatedFields[item.id] = {
                  alert: "",
                  valid: true,
                })
              : (validatedFields[item.id] = {
                  alert: "Not enough funds",
                  valid: false,
                })
            : (validatedFields[item.id] = {
                alert: "",
                valid: true,
              });
        } else {
          validatedFields[item.id] = {
            alert: "Value is not a number",
            valid: false,
          };
        }
        // Update inputs valididty and alert messages
        setValidatedInputs(validatedFields);
      });
    }
    // Validation function ends here

    // Autofill inactive input
    e.target.id === "amount1"
      ? (amount2Ref.current.value = calculateInputValue({
          value: amount1Ref.current.value,
          rate: currencyPairRates.rate1 / currencyPairRates.rate2,
        }))
      : (amount1Ref.current.value = calculateInputValue({
          value: amount2Ref.current.value,
          rate: currencyPairRates.rate2 / currencyPairRates.rate1,
        }));
    validateInputs([amount1Ref.current, amount2Ref.current]);
    setIsFormValid(
      validatedInputs.amount1.valid && validatedInputs.amount2.valid
    );
  };

  // Calculate and format inactive input value
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      props.onTransactionSubmit({
        name1: currencyPair.name1,
        amount1: Number(amount1Ref.current.value),
        name2: currencyPair.name2,
        amount2: Number(amount2Ref.current.value),
        walletId: props.wallet._id,
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
          <div className="form__alerts">
            <span
              className="form__input-alert form__input-alert_orange"
              id="currency1-alert"
            >
              {validatedInputs.amount1.alert}
            </span>
            <span
              className="form__input-alert form__input-alert_pink"
              id="rate1-alert"
            >
              {`${
                currencyPairRates.rate1
                  ? `USD/${currencyPair.name1}=${currencyPairRates.rate1}`
                  : ""
              }`}
            </span>
          </div>
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
          <div className="form__alerts">
            <span
              className="form__input-alert form__input-alert_orange"
              id="currency1-alert"
            >
              {validatedInputs.amount2.alert}
            </span>
            <span
              className="form__input-alert form__input-alert_pink"
              id="rate1-alert"
            >
              {`${
                currencyPairRates.rate1
                  ? `USD/${currencyPair.name2}=${currencyPairRates.rate2}`
                  : ""
              }`}
            </span>
          </div>
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
