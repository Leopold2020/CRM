import { Link } from "react-router-dom";    
import './Header.css'

function Header () {
  return(
      <>
      <ul className="links">
          <li><Link to="">Home</Link></li>
          <li><Link to="products">Product</Link></li>
          <li><Link to="login">Login</Link></li>
          <li><Link to="shoppingcart">Shopping Cart</Link></li>
          <li><Link to="admin/products">Admin</Link></li>
      </ul>
      </>
  )
}

export default Header;