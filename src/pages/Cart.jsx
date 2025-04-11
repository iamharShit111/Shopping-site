import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>$ {item.price} x {item.quantity}</p>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      {cart.length > 0 && (
        <>
          <h3>Total: $ {total.toFixed(2)}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
      {showPopup && <div className="popup">Order placed successfully!</div>}
    </div>
  );
}

export default Cart;