import { useState } from "react";
import axios from "axios";
import "./AddNewWarehouse.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";

const AddNewWarehouse = () => {
  const initialWarehouseData = {
    warehouseName: "",
    streetAddress: "",
    city: "",
    country: "",
  };

  const initialContactData = {
    contactName: "",
    position: "",
    phoneNumber: "",
    email: "",
  };

  const [warehouseData, setWarehouseData] = useState(initialWarehouseData);
  const [contactData, setContactData] = useState(initialContactData);

  const handleWarehouseChange = (e) => {
    setWarehouseData({ ...warehouseData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      warehouse_name: warehouseData.warehouseName,
      address: warehouseData.streetAddress,
      city: warehouseData.city,
      country: warehouseData.country,
      contact_name: contactData.contactName,
      contact_position: contactData.position,
      contact_phone: contactData.phoneNumber,
      contact_email: contactData.email,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await axios.post("http://localhost:8080/api/warehouses", payload);
      alert("Warehouse created successfully!");
      setWarehouseData(initialWarehouseData);
      setContactData(initialContactData);
    } catch (error) {
      console.error("Error creating warehouse:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setWarehouseData(initialWarehouseData);
    setContactData(initialContactData);
  };

  return (
    <div className="addWarehouse">
      <div className="form__container">
        {/* NAVIGATION */}
        <div className="form__nav">
          <div className="back-link">
            <ArrowBack />
            <h1 className="form__nav-header">Add New Warehouse</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form__warehouse-details">
          {/* WAREHOUSE DETAILS COLUMN */}
          <div className="form">
            <div className="form__address">
              <h2 className="warehouse_label">Warehouse Details</h2>

              <label>Warehouse Name</label>
              <input
                className="form-input"
                type="text"
                name="warehouseName"
                placeholder="Warehouse Name"
                value={warehouseData.warehouseName}
                onChange={handleWarehouseChange}
              />

              <label>Street Address</label>
              <input
                className="form-input"
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                value={warehouseData.streetAddress}
                onChange={handleWarehouseChange}
              />

              <label>City</label>
              <input
                className="form-input"
                type="text"
                name="city"
                placeholder="City"
                value={warehouseData.city}
                onChange={handleWarehouseChange}
              />

              <label>Country</label>
              <input
                className="form-input"
                type="text"
                name="country"
                placeholder="Country"
                value={warehouseData.country}
                onChange={handleWarehouseChange}
              />
            </div>

            {/* CONTACT DETAILS CONTAINER */}
            <div className="form__contact-info">
              <h2 className="warehouse_label">Contact Details</h2>

              <label>Contact Name</label>
              <input
                className="form-input"
                type="text"
                name="contactName"
                placeholder="Contact Name"
                value={contactData.contactName}
                onChange={handleContactChange}
              />

              <label>Position</label>
              <input
                className="form-input"
                type="text"
                name="position"
                placeholder="Position"
                value={contactData.position}
                onChange={handleContactChange}
              />

              <label>Phone Number</label>
              <input
                className="form-input"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={contactData.phoneNumber}
                onChange={handleContactChange}
              />

              <label>Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                value={contactData.email}
                onChange={handleContactChange}
              />
            </div>
          </div>

          {/* BUTTONS INSIDE FORM */}
          <div className="form__buttons">
            <button
              type="button"
              className="btn-main cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-main save-btn">
              + Add Warehouse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewWarehouse;
