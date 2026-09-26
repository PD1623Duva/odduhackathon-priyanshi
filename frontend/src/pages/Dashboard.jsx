import React from "react";
import "./Dashboard.css";

function Dashboard({ onNavigate }) {
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">LOGO</div>

        <nav className="sidebar-nav">
          <a className="nav-item active" href="#">
            <span>⌂</span>
            Dashboard
          </a>

          <button
            className="nav-item"
            onClick={() => onNavigate("products")}
          >
            <span>◇</span>
            Products
          </button>

          <div className="nav-section">
            <div className="nav-item">
              <span>▣</span>
              Operations
              <span className="arrow">⌄</span>
            </div>

            <a className="sub-item" href="#">Receipts</a>
            <a className="sub-item" href="#">Deliveries</a>
            <a className="sub-item" href="#">Transfers</a>
            <a className="sub-item" href="#">Adjustments</a>
          </div>

          <div className="sidebar-divider"></div>

          <a className="nav-item" href="#">
            <span>♙</span>
            Profile
          </a>

          <a className="nav-item" href="#">
            <span>⇥</span>
            Logout
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOP BAR */}
        <header className="topbar">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search products, orders, or stock..."
            />
          </div>

          <div className="user-area">
            <span className="notification">♧</span>

            <div className="avatar">P</div>

            <span>Priyanshi Duva</span>
            <span>⌄</span>
          </div>
        </header>

        {/* WELCOME BANNER */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <h1>Good Morning, Priyanshi! 🌸</h1>
            <p>
              Here's what's happening with your inventory today.
            </p>
          </div>

          <div className="quote">
            <p>
              "Organised inventory<br />
              builds bigger possibilities."
            </p>
            <span>―</span>
          </div>
        </section>

        {/* STAT CARDS */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon purple">◇</div>
            <div>
              <p>Total Products</p>
              <h2>120</h2>
              <span className="growth">↑ 12%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon beige">▤</div>
            <div>
              <p>Total Receipts</p>
              <h2>85</h2>
              <span className="growth">↑ 8%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pink">▣</div>
            <div>
              <p>Total Deliveries</p>
              <h2>60</h2>
              <span className="growth">↑ 5%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">⇄</div>
            <div>
              <p>Total Transfers</p>
              <h2>25</h2>
              <span className="growth">↑ 10%</span>
            </div>
          </div>

        </section>

        {/* CHARTS */}
        <section className="charts-grid">

          {/* INVENTORY OVERVIEW */}
          <div className="dashboard-card inventory-card">

            <div className="card-header">
              <h2>Inventory Overview</h2>

              <button className="month-btn">
                This Month <span>⌄</span>
              </button>
            </div>

            <div className="chart">

              <div className="y-axis">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>

              <div className="chart-area">

                {[
                  ["Jan", 65, 42, 25, 35],
                  ["Feb", 55, 37, 25, 25],
                  ["Mar", 68, 50, 20, 22],
                  ["Apr", 67, 53, 27, 28],
                  ["May", 75, 53, 40, 30],
                  ["Jun", 75, 55, 32, 35],
                ].map((month) => (
                  <div className="month-group" key={month[0]}>

                    <div className="bars">

                      <span
                        className="bar receipts"
                        style={{ height: `${month[1]}%` }}
                      ></span>

                      <span
                        className="bar deliveries"
                        style={{ height: `${month[2]}%` }}
                      ></span>

                      <span
                        className="bar transfers"
                        style={{ height: `${month[3]}%` }}
                      ></span>

                      <span
                        className="bar adjustments"
                        style={{ height: `${month[4]}%` }}
                      ></span>

                    </div>

                    <span className="month-name">
                      {month[0]}
                    </span>

                  </div>
                ))}

              </div>
            </div>

            <div className="chart-legend">
              <span>
                <i className="legend receipts"></i>
                Receipts
              </span>

              <span>
                <i className="legend deliveries"></i>
                Deliveries
              </span>

              <span>
                <i className="legend transfers"></i>
                Transfers
              </span>

              <span>
                <i className="legend adjustments"></i>
                Adjustments
              </span>
            </div>

          </div>

          {/* PRODUCT CATEGORIES */}
          <div className="dashboard-card categories-card">

            <h2>Product Categories</h2>

            <div className="category-content">

              <div className="donut">
                <div className="donut-center">
                  <strong>120</strong>
                  <span>Products</span>
                </div>
              </div>

              <div className="category-list">

                <div>
                  <span>
                    <i className="category-dot electronics"></i>
                    Electronics
                  </span>
                  <b>30%</b>
                </div>

                <div>
                  <span>
                    <i className="category-dot stationery"></i>
                    Stationery
                  </span>
                  <b>25%</b>
                </div>

                <div>
                  <span>
                    <i className="category-dot furniture"></i>
                    Furniture
                  </span>
                  <b>20%</b>
                </div>

                <div>
                  <span>
                    <i className="category-dot accessories"></i>
                    Accessories
                  </span>
                  <b>15%</b>
                </div>

                <div>
                  <span>
                    <i className="category-dot others"></i>
                    Others
                  </span>
                  <b>10%</b>
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* BOTTOM SECTION */}
        <section className="bottom-grid">

          {/* RECENT ACTIVITIES */}
          <div className="dashboard-card activity-card">

            <div className="card-header">
              <h2>Recent Activities</h2>
              <a href="#">View All →</a>
            </div>

            <div className="activity">
              <span className="activity-icon">◇</span>
              <p>New product added: Wireless Mouse</p>
              <time>2 hours ago</time>
            </div>

            <div className="activity">
              <span className="activity-icon">▣</span>
              <p>Delivery completed: Order #1023</p>
              <time>4 hours ago</time>
            </div>

            <div className="activity">
              <span className="activity-icon">⚙</span>
              <p>Stock adjustment: -5 units (Notebook)</p>
              <time>6 hours ago</time>
            </div>

            <div className="activity">
              <span className="activity-icon">⇄</span>
              <p>Transfer initiated: Main → Branch A</p>
              <time>1 day ago</time>
            </div>

          </div>

          {/* LOW STOCK */}
          <div className="dashboard-card stock-card">

            <div className="card-header">
              <h2>Low Stock Items</h2>
              <a href="#">View All →</a>
            </div>

            <div className="stock-item">
              <div className="product-image">📓</div>

              <div className="product-info">
                <strong>Notebook</strong>
                <span>Stationery</span>
              </div>

              <b>5 left</b>
            </div>

            <div className="stock-item">
              <div className="product-image">🖱️</div>

              <div className="product-info">
                <strong>Wireless Mouse</strong>
                <span>Electronics</span>
              </div>

              <b>8 left</b>
            </div>

            <div className="stock-item">
              <div className="product-image">🪑</div>

              <div className="product-info">
                <strong>Office Chair</strong>
                <span>Furniture</span>
              </div>

              <b>3 left</b>
            </div>

            <div className="stock-item">
              <div className="product-image">🖊️</div>

              <div className="product-info">
                <strong>Marker Set</strong>
                <span>Stationery</span>
              </div>

              <b>7 left</b>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;