import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNewWarehouse.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";

const AddNewWarehouse = () => {
  const PORT = import.meta.env.VITE_PORT || "8080";
  const URL = `http://localhost:${PORT}`;
  const navigate = useNavigate();

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
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

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
      const response = await axios.post(`${URL}/api/warehouses`, payload);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create warehouse");
      }

      // Show success message after data is successfully added
      setSuccessMessage("Warehouse created successfully!");

      setWarehouseData(initialWarehouseData);
      setContactData(initialContactData);
      navigate(-1); // go back after successful submission
    } catch (error) {
      console.error("Error creating warehouse:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setWarehouseData(initialWarehouseData);
    setContactData(initialContactData);
    navigate(-1); // go back when Cancel is clicked
  };

  return (
    <div className="addWarehouse">
      <div className="form__container">
        {/* NAVIGATION */}
        <div className="form__nav">
          <div className="back-link">
            <ArrowBack onClick={() => navigate(-1)} /> <h1 className="form__nav-header">Add New Warehouse</h1>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form form__warehouse-details">
          {/* WAREHOUSE DETAILS */}
          <div className="form__fields">
            {/* ADDRESS DETAILS CONTAINER */}
            <div className="form__column form__column-left">
              <h2 className="form__header">Warehouse Details</h2>

              <div className="form__group">
                <label className="form-label">Warehouse Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="warehouseName"
                  placeholder="Warehouse Name"
                  value={warehouseData.warehouseName}
                  onChange={handleWarehouseChange}
                />
              </div>

              <div className="form__group">
                <label className="form-label">Street Address</label>
                <input
                  className="form-input"
                  type="text"
                  name="streetAddress"
                  placeholder="Street Address"
                  value={warehouseData.streetAddress}
                  onChange={handleWarehouseChange}
                />
              </div>

              <div className="form__group">
                <label className="form-label">City</label>
                <input
                  className="form-input"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={warehouseData.city}
                  onChange={handleWarehouseChange}
                />
              </div>

              <div className="form__group">
                <label className="form-label">Country</label>
                <input
                  className="form-input"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={warehouseData.country}
                  onChange={handleWarehouseChange}
                />
              </div>
            </div>

            {/* CONTACT DETAILS CONTAINER */}
            <div className="form__column">
              <h2 className="form__header">Contact Details</h2>

              <div className="form__group">
                <label className="form-label">Contact Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="contactName"
                  placeholder="Contact Name"
                  value={contactData.contactName}
                  onChange={handleContactChange}
                />
              </div>

              <div className="form__group">
                <label className="form-label">Position</label>
                <input
                  className="form-input"
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={contactData.position}
                  onChange={handleContactChange}
                />
              </div>

              <div className="form__group">
                <label className="form-label">Phone Number</label>
                <input
                  className="form-input"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={contactData.phoneNumber}
                  onChange={handleContactChange}
                />
              </div>

              <div className="form__group">
                <label className="form-label">Email</label>
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
