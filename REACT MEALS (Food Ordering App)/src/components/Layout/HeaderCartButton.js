import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";

import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const ctx = useContext(CartContext);
  const { items } = ctx; // object destructuring--> pulling out only the items array from our context(ctx)
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(()=>{
        setBtnIsHighlighted(false);
    } , 300)

    return ()=>{
        clearTimeout(timer);  // whenever we return a function in use effect it will be called automatically as a cleanup function by react.
        // it's a good practice to clean up the timer.
    }
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
