import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Filters from "../components/Filter";

function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    selectedColor: "",
    minPrice: 0,
    maxPrice: 50,
    selectedName: "",
    inStock: false,
  });

  // Fetch products from the backend using fetch API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const colors = [
    "red", "blue", "green", "white", "yellow", "purple", 
    "black", "brown", "pink", "orange", "cyan", "magenta", 
    "lime", "indigo",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesColor = filters.selectedColor
      ? product.colors.includes(filters.selectedColor)
      : true;
    const matchesName = product.name
      .toLowerCase()
      .includes(filters.selectedName.toLowerCase());
    const matchesMinPrice = product.price >= filters.minPrice;
    const matchesMaxPrice = product.price <= filters.maxPrice;
    const matchesStock = filters.inStock ? product.inStock === true : true;

    return (
      matchesColor &&
      matchesName &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesStock
    );
  });

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1">
          <Filters
            selectedColor={filters.selectedColor}
            setSelectedColor={(color) =>
              setFilters({ ...filters, selectedColor: color })
            }
            minPrice={filters.minPrice}
            setMinPrice={(price) => setFilters({ ...filters, minPrice: price })}
            maxPrice={filters.maxPrice}
            setMaxPrice={(price) => setFilters({ ...filters, maxPrice: price })}
            selectedName={filters.selectedName}
            setSelectedName={(name) =>
              setFilters({ ...filters, selectedName: name })
            }
            inStock={filters.inStock}
            setInStock={(stock) => setFilters({ ...filters, inStock: stock })}
            colors={colors}
          />
        </div>
        <div className="col-span-1 md:col-span-3">
          <h2 className="text-3xl font-bold mb-4">Products</h2>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <ProductList products={filteredProducts} addToCart={addToCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
