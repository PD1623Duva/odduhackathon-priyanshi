import { useState, useEffect } from "react";
import "./Products.css";

function Products({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(
            data.products.map((product) => ({
              id: product._id,
              name: product.name,
              sku: product.sku,
              category: product.category,
              price: product.price || 0,
              stock: product.stock,
            }))
          );
        }
      })
      .catch((error) => console.error("Failed to load products:", error));
  }, []);

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "Electronics",
    price: "",
    stock: "",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 10) return "Low Stock";
    return "In Stock";
  };

  const getStatusClass = (stock) => {
    if (stock === 0) return "out";
    if (stock <= 10) return "low";
    return "in";
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.sku ||
      !newProduct.price ||
      !newProduct.stock
    ) {
      return;
    }

    fetch("http://localhost:5001/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProduct.name,
        sku: newProduct.sku,
        category: newProduct.category,
        unit: "pcs",
        stock: Number(newProduct.stock),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const product = {
            id: data.product._id,
            name: data.product.name,
            sku: data.product.sku,
            category: data.product.category,
            price: Number(newProduct.price),
            stock: data.product.stock,
          };
          setProducts((current) => [...current, product]);
          setNewProduct({
            name: "",
            sku: "",
            category: "Electronics",
            price: "",
            stock: "",
          });
          setShowModal(false);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to add product:", error);
        alert("Failed to connect to backend");
      });

    setNewProduct({
      name: "",
      sku: "",
      category: "Electronics",
      price: "",
      stock: "",
    });

    setShowModal(false);
  };

  return (
    <div className="products-page">

      {/* Sidebar */}
      <aside className="products-sidebar">

        <div className="products-brand">
          <div className="products-brand-icon">O</div>
          <span>StockSense</span>
        </div>

        <nav className="products-nav">

          <button
            className="products-nav-item"
            onClick={() => onNavigate("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button className="products-nav-item active">
            <span>▣</span>
            Products
          </button>

          <button className="products-nav-item">
            <span>↕</span>
            Stock Movement
          </button>

          <button className="products-nav-item">
            <span>⚠</span>
            Alerts
          </button>

          <button className="products-nav-item">
            <span>◫</span>
            Reports
          </button>

        </nav>

        <div className="products-sidebar-bottom">

          <button className="products-nav-item">
            <span>⚙</span>
            Settings
          </button>

          <button className="products-nav-item">
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="products-main">

        {/* Header */}
        <header className="products-header">

          <div>
            <p className="products-welcome">
              Inventory Management
            </p>

            <h1>Products</h1>

            <p className="products-subtitle">
              Manage and monitor all your inventory items
            </p>
          </div>

          <div className="products-profile">
            <div className="products-avatar">A</div>

            <div>
              <strong>Aayushi</strong>
              <span>Administrator</span>
            </div>
          </div>

        </header>

        {/* Top actions */}
        <section className="products-toolbar">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search products or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Furniture">Furniture</option>
          </select>

          <button
            className="add-product-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Product
          </button>

        </section>

        {/* Product summary */}
        <section className="product-summary">

          <div>
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>

          <div>
            <span>In Stock</span>
            <strong>
              {products.filter((p) => p.stock > 10).length}
            </strong>
          </div>

          <div>
            <span>Low Stock</span>
            <strong className="summary-warning">
              {products.filter((p) => p.stock > 0 && p.stock <= 10).length}
            </strong>
          </div>

          <div>
            <span>Out of Stock</span>
            <strong className="summary-danger">
              {products.filter((p) => p.stock === 0).length}
            </strong>
          </div>

        </section>

        {/* Product table */}
        <section className="products-table-card">

          <div className="table-heading">
            <div>
              <h2>All Products</h2>
              <p>
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
          </div>

          <div className="table-wrapper">

            <table className="products-table">

              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>SKU</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr key={product.id}>

                    <td>
                      <div className="product-name">
                        <div className="product-icon">
                          {product.name.charAt(0)}
                        </div>

                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td className="sku">
                      {product.sku}
                    </td>

                    <td>
                      <span className="category-tag">
                        {product.category}
                      </span>
                    </td>

                    <td>
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>

                    <td>
                      {product.stock}
                    </td>

                    <td>
                      <span
                        className={`stock-status ${getStatusClass(
                          product.stock
                        )}`}
                      >
                        <span></span>
                        {getStockStatus(product.stock)}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                No products found.
              </div>
            )}

          </div>

        </section>

      </main>

      {/* Add Product Modal */}
      {showModal && (

        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <h2>Add Product</h2>
                <p>Add a new item to your inventory</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={addProduct}>

              <label>
                Product Name

                <input
                  type="text"
                  placeholder="e.g. Wireless Headphones"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                SKU

                <input
                  type="text"
                  placeholder="e.g. WH-009"
                  value={newProduct.sku}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      sku: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Category

                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value,
                    })
                  }
                >
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Furniture</option>
                </select>

              </label>

              <div className="form-row">

                <label>
                  Price

                  <input
                    type="number"
                    placeholder="0"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Stock

                  <input
                    type="number"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock: e.target.value,
                      })
                    }
                  />
                </label>

              </div>

              <button
                type="submit"
                className="save-product-btn"
              >
                Add Product
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;