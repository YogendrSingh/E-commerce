import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(10); 

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.title} added to cart!`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const offset = currentPage * productsPerPage;
  const currentPageProducts = filteredProducts.slice(offset, offset + productsPerPage);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="#">MyShop</a>
          </div>
          <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#deals">Deals</a></li>
              <li><a href="#wishlist"><FaHeart /> Wishlist</a></li>
              <li><a href="#account"><FaUser /> Account</a></li>
              <li className="navbar-cart">
                <a href="#cart"><FaShoppingCart /> <span>({cart.length})</span></a>
              </li>
            </ul>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="navbar-burger" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      <div className="product-grid">
        {currentPageProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">Rs{product.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default ProductList;
