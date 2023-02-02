import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Wallet(props) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <section className="wallet">
      {JSON.stringify(props.wallet)}
    </section>
  );
}

export default Wallet;
