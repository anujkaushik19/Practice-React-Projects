import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkOut, setCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      "https://react2-1984e-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHide}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkOut && (
        <CheckOut onConfirm={submitOrderHandler} onHide={props.onHide} />
      )}
      {!checkOut && modalActions}
    </Fragment>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitOrderContent = (
    <Fragment>
      <p>Successfully sent order!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHide}>
          Close
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onHide={props.onHide}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitOrderContent}
    </Modal>
  );
};

export default Cart;
