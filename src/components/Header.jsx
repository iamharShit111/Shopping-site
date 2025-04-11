import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Header() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/cart">Cart ({cartCount})</Link> |{' '}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;