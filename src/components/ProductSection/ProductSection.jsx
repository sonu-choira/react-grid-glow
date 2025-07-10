
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductSection.module.css';

const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports'];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99.99",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop"
    ],
    description: "Premium wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$199.99",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&h=300&fit=crop"
    ],
    description: "Advanced fitness tracking and smartphone integration"
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: "$149.99",
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=300&fit=crop"
    ],
    description: "Stylish sunglasses with UV protection"
  },
  {
    id: 4,
    name: "Yoga Mat",
    price: "$29.99",
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1506629905607-c65808e1e8c4?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
    ],
    description: "Non-slip yoga mat for all fitness levels"
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: "$79.99",
    category: "Home & Garden",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop"
    ],
    description: "Automatic coffee maker with programmable timer"
  },
  {
    id: 6,
    name: "Running Shoes",
    price: "$89.99",
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop"
    ],
    description: "Comfortable running shoes with excellent support"
  }
];

const ProductCarousel = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.productImageCarousel}>
      <img src={images[currentImageIndex]} alt={productName} />
      
      {images.length > 1 && (
        <>
          <button 
            className={`${styles.carouselButton} ${styles.prevButton}`}
            onClick={prevImage}
            aria-label="Previous image"
          >
            &#8249;
          </button>
          <button 
            className={`${styles.carouselButton} ${styles.nextButton}`}
            onClick={nextImage}
            aria-label="Next image"
          >
            &#8250;
          </button>
          
          <div className={styles.carouselDots}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.carouselDot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className={styles.productSection} id="products">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className={styles.categoryTabs}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryTab} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <ProductCarousel images={product.images} productName={product.name} />
                <div className={styles.productOverlay}>
                  <Link to={`/product/${product.id}`} className={styles.viewButton}>View Details</Link>
                </div>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productPrice}>{product.price}</div>
                <button className={styles.addToCartButton}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
