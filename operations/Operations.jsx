import { useState } from "react";

function Operations() {
  const [activeTab, setActiveTab] = useState("receipts");

  const [receipts, setReceipts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [adjustments, setAdjustments] = useState([]);

  const [receipt, setReceipt] = useState({
    supplier: "",
    product: "",
    quantity: ""
  });

  const [delivery, setDelivery] = useState({
    customer: "",
    product: "",
    quantity: "",
    status: "Pending"
  });

  const [transfer, setTransfer] = useState({
    from: "",
    to: "",
    product: "",
    quantity: ""
  });

  const [adjustment, setAdjustment] = useState({
    product: "",
    systemStock: "",
    physicalCount: ""
  });

  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReceipt = (e) => {
    e.preventDefault();

    if (!receipt.supplier || !receipt.product || !receipt.quantity) {
      showMessage("Please fill all fields");
      return;
    }

    setReceipts([
      ...receipts,
      {
        id: Date.now(),
        ...receipt,
        quantity: Number(receipt.quantity),
        date: new Date().toLocaleString()
      }
    ]);

    setReceipt({ supplier: "", product: "", quantity: "" });
    showMessage("Stock received successfully");
  };

  const handleDelivery = (e) => {
    e.preventDefault();

    if (!delivery.customer || !delivery.product || !delivery.quantity) {
      showMessage("Please fill all fields");
      return;
    }

    setDeliveries([
      ...deliveries,
      {
        id: Date.now(),
        ...delivery,
        quantity: Number(delivery.quantity),
        status: "Validated",
        date: new Date().toLocaleString()
      }
    ]);

    setDelivery({
      customer: "",
      product: "",
      quantity: "",
      status: "Pending"
    });

    showMessage("Delivery completed successfully");
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    if (!transfer.from || !transfer.to || !transfer.product || !transfer.quantity) {
      showMessage("Please fill all fields");
      return;
    }

    if (transfer.from === transfer.to) {
      showMessage("Source and destination cannot be the same");
      return;
    }

    setTransfers([
      ...transfers,
      {
        id: Date.now(),
        ...transfer,
        quantity: Number(transfer.quantity),
        date: new Date().toLocaleString()
      }
    ]);

    setTransfer({ from: "", to: "", product: "", quantity: "" });
    showMessage("Stock transferred successfully");
  };

  const handleAdjustment = (e) => {
    e.preventDefault();

    if (
      !adjustment.product ||
      adjustment.systemStock === "" ||
      adjustment.physicalCount === ""
    ) {
      showMessage("Please fill all fields");
      return;
    }

    const difference =
      Number(adjustment.physicalCount) -
      Number(adjustment.systemStock);

    setAdjustments([
      ...adjustments,
      {
        id: Date.now(),
        product: adjustment.product,
        systemStock: Number(adjustment.systemStock),
        physicalCount: Number(adjustment.physicalCount),
        adjustment: difference,
        date: new Date().toLocaleString()
      }
    ]);

    setAdjustment({
      product: "",
      systemStock: "",
      physicalCount: ""
    });

    showMessage("Stock adjustment completed");
  };

  const deliveryStatus = (status) => {
    setDelivery({ ...delivery, status });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        <h1>Inventory Operations</h1>
        <p style={{ color: "#666" }}>
          Manage receipts, deliveries, transfers and stock adjustments
        </p>

        {message && (
          <div
            style={{
              background: "#d1fae5",
              color: "#065f46",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "20px"
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
            flexWrap: "wrap"
          }}
        >
          <button
            onClick={() => setActiveTab("receipts")}
            style={buttonStyle(activeTab === "receipts")}
          >
            Receipts
          </button>

          <button
            onClick={() => setActiveTab("deliveries")}
            style={buttonStyle(activeTab === "deliveries")}
          >
            Deliveries
          </button>

          <button
            onClick={() => setActiveTab("transfers")}
            style={buttonStyle(activeTab === "transfers")}
          >
            Transfers
          </button>

          <button
            onClick={() => setActiveTab("adjustments")}
            style={buttonStyle(activeTab === "adjustments")}
          >
            Adjustments
          </button>
        </div>

        {activeTab === "receipts" && (
          <div>
            <div style={cardStyle}>
              <h2>Receive Stock</h2>

              <form onSubmit={handleReceipt}>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Supplier"
                  value={receipt.supplier}
                  onChange={(e) =>
                    setReceipt({
                      ...receipt,
                      supplier: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Product"
                  value={receipt.product}
                  onChange={(e) =>
                    setReceipt({
                      ...receipt,
                      product: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={receipt.quantity}
                  onChange={(e) =>
                    setReceipt({
                      ...receipt,
                      quantity: e.target.value
                    })
                  }
                />

                <button style={submitStyle}>Validate Receipt</button>
              </form>
            </div>

            <div style={cardStyle}>
              <h2>Receipt History</h2>

              {receipts.length === 0 ? (
                <p>No receipts yet.</p>
              ) : (
                receipts.map((item) => (
                  <div key={item.id} style={recordStyle}>
                    <strong>{item.product}</strong>
                    <p>Supplier: {item.supplier}</p>
                    <p>Quantity: {item.quantity}</p>
                    <small>{item.date}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "deliveries" && (
          <div>
            <div style={cardStyle}>
              <h2>Deliver Stock</h2>

              <form onSubmit={handleDelivery}>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Customer"
                  value={delivery.customer}
                  onChange={(e) =>
                    setDelivery({
                      ...delivery,
                      customer: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Product"
                  value={delivery.product}
                  onChange={(e) =>
                    setDelivery({
                      ...delivery,
                      product: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={delivery.quantity}
                  onChange={(e) =>
                    setDelivery({
                      ...delivery,
                      quantity: e.target.value
                    })
                  }
                />

                <div style={{ marginBottom: "15px" }}>
                  <button
                    type="button"
                    style={smallButtonStyle}
                    onClick={() => deliveryStatus("Picked")}
                  >
                    Pick
                  </button>

                  <button
                    type="button"
                    style={smallButtonStyle}
                    onClick={() => deliveryStatus("Packed")}
                  >
                    Pack
                  </button>

                  <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                    Status: {delivery.status}
                  </span>
                </div>

                <button style={submitStyle}>Validate Delivery</button>
              </form>
            </div>

            <div style={cardStyle}>
              <h2>Delivery History</h2>

              {deliveries.length === 0 ? (
                <p>No deliveries yet.</p>
              ) : (
                deliveries.map((item) => (
                  <div key={item.id} style={recordStyle}>
                    <strong>{item.product}</strong>
                    <p>Customer: {item.customer}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Status: {item.status}</p>
                    <small>{item.date}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "transfers" && (
          <div>
            <div style={cardStyle}>
              <h2>Transfer Stock</h2>

              <form onSubmit={handleTransfer}>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="From Warehouse"
                  value={transfer.from}
                  onChange={(e) =>
                    setTransfer({
                      ...transfer,
                      from: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="text"
                  placeholder="To Warehouse"
                  value={transfer.to}
                  onChange={(e) =>
                    setTransfer({
                      ...transfer,
                      to: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Product"
                  value={transfer.product}
                  onChange={(e) =>
                    setTransfer({
                      ...transfer,
                      product: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={transfer.quantity}
                  onChange={(e) =>
                    setTransfer({
                      ...transfer,
                      quantity: e.target.value
                    })
                  }
                />

                <button style={submitStyle}>Transfer Stock</button>
              </form>
            </div>

            <div style={cardStyle}>
              <h2>Transfer History</h2>

              {transfers.length === 0 ? (
                <p>No transfers yet.</p>
              ) : (
                transfers.map((item) => (
                  <div key={item.id} style={recordStyle}>
                    <strong>{item.product}</strong>
                    <p>
                      {item.from} → {item.to}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <small>{item.date}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "adjustments" && (
          <div>
            <div style={cardStyle}>
              <h2>Stock Adjustment</h2>

              <form onSubmit={handleAdjustment}>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Product"
                  value={adjustment.product}
                  onChange={(e) =>
                    setAdjustment({
                      ...adjustment,
                      product: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  placeholder="System Stock"
                  value={adjustment.systemStock}
                  onChange={(e) =>
                    setAdjustment({
                      ...adjustment,
                      systemStock: e.target.value
                    })
                  }
                />

                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  placeholder="Physical Count"
                  value={adjustment.physicalCount}
                  onChange={(e) =>
                    setAdjustment({
                      ...adjustment,
                      physicalCount: e.target.value
                    })
                  }
                />

                <div
                  style={{
                    background: "#f1f5f9",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "15px"
                  }}
                >
                  Adjustment:{" "}
                  <strong>
                    {adjustment.systemStock !== "" &&
                    adjustment.physicalCount !== ""
                      ? Number(adjustment.physicalCount) -
                        Number(adjustment.systemStock)
                      : 0}
                  </strong>
                </div>

                <button style={submitStyle}>Adjust Stock</button>
              </form>
            </div>

            <div style={cardStyle}>
              <h2>Adjustment History</h2>

              {adjustments.length === 0 ? (
                <p>No adjustments yet.</p>
              ) : (
                adjustments.map((item) => (
                  <div key={item.id} style={recordStyle}>
                    <strong>{item.product}</strong>
                    <p>System Stock: {item.systemStock}</p>
                    <p>Physical Count: {item.physicalCount}</p>
                    <p>
                      Adjustment: <strong>{item.adjustment}</strong>
                    </p>
                    <small>{item.date}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

const inputStyle = {
  display: "block",
  width: "100%",
  maxWidth: "500px",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "7px",
  boxSizing: "border-box"
};

const submitStyle = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer"
};

const smallButtonStyle = {
  padding: "8px 15px",
  marginRight: "8px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  background: "white",
  cursor: "pointer"
};

const recordStyle = {
  padding: "15px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  marginBottom: "10px"
};

const buttonStyle = (active) => ({
  padding: "12px 20px",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  background: active ? "#2563eb" : "#e5e7eb",
  color: active ? "white" : "#111827"
});

export default Operations;
