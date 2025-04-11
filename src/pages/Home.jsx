import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';
      const res = await axios.get(url);
      setProducts(res.data);
    };

    const fetchCategories = async () => {
      const res = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(res.data);
    };

    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  return (
    <div>
      <h2>Products</h2>

      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="grid">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="card">
            <img src={product.image} alt={product.title} height={150} />
            <h4>{product.title}</h4>
            <p>$ {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;