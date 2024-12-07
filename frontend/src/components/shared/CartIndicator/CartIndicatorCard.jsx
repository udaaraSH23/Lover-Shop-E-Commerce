import React, { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartCard.css' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const CartIndicatorCard = () => {
  const { cartItemCount, isAuthenticated } = useContext(CartContext); 
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      alert('View your cart.'); // Replace with your cart logic
      // navigate('/cart'); // Redirect to the cart page if the user is logged in
    } else {
      alert('Please log in to view your cart.');
      // Optionally, redirect to login page
      // navigate('/login'); // Redirect to login page
    }
  };

  return (
    
    <div className="cart-indicator" onClick={handleClick}>
      <div className="cart-icon">
        {/* Here you can add your cart icon */}
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
      <span className="cart-count">{cartItemCount || 0}</span>
    </div>
  );
};

export default CartIndicatorCard;