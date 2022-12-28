import classes from "./CheckOut.module.css";
import React, { useRef, useState } from "react";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const codeInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    code: true,
  });

  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5; // just adding the validation logics

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCode = codeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredCodeIsValid = isFiveChars(enteredCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      code: enteredCodeIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name : enteredName,
      street : enteredStreet,
      code : enteredCode,
      city : enteredCity
    })
  };

  const nameClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeClasses = `${classes.control} ${
    formInputsValidity.code ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a valid street!</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={codeInputRef} />
        {!formInputsValidity.code && (
          <p>Please Enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onHide}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
