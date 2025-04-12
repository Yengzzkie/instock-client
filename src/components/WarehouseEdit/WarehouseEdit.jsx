import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./WarehouseEdit.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";

const WarehouseEdit = () => {
  const { warehouseId } = useParams(); // Get warehouse ID from URL
  const navigate = useNavigate(); // We use this to navigate to the previous page

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

  // Fetch warehouse data from the API
  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/warehouses/${warehouseId}`);
        const data = response.data;

        // Assuming the response structure matches these fields
        setWarehouseData({
          warehouseName: data.warehouse_name,
          streetAddress: data.address,
          city: data.city,
          country: data.country,
        });
        setContactData({
          contactName: data.contact_name,
          position: data.contact_position,
          phoneNumber: data.contact_phone,
          email: data.contact_email,
        });
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
        alert("Failed to load warehouse data");
      }
    };

    fetchWarehouseData();
  }, [warehouseId]);

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
      const response = await axios.patch(
        `http://localhost:8080/warehouses/${warehouseId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to update warehouse details");

      alert("Warehouse details updated successfully!");
      navigate(-1); // Take us back to the previous page after success
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setWarehouseData(initialWarehouseData);
    setContactData(initialContactData);
    navigate(-1); // This also takes us back if the user hits "Cancel"
  };

  return (
    <div className="form__container">
      {/* NAVIGATION */}
      <div className="form__nav">
        <div className="back-link">
          <ArrowBack onClick={() => navigate(-1)} /> {/* Back to previous page */}
          <h1 className="form__nav-header">Edit Warehouse</h1>
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
              placeholder="Washington"
              value={warehouseData.warehouseName}
              onChange={handleWarehouseChange}
            />

            <label>Street Address</label>
            <input
              className="form-input"
              type="text"
              name="streetAddress"
              placeholder="33 Pearl Street SW"
              value={warehouseData.streetAddress}
              onChange={handleWarehouseChange}
            />

            <label>City</label>
            <input
              className="form-input"
              type="text"
              name="city"
              placeholder="Washington"
              value={warehouseData.city}
              onChange={handleWarehouseChange}
            />

            <label>Country</label>
            <input
              className="form-input"
              type="text"
              name="country"
              placeholder="USA"
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
              placeholder="Graeme Lyon"
              value={contactData.contactName}
              onChange={handleContactChange}
            />

            <label>Position</label>
            <input
              className="form-input"
              type="text"
              name="position"
              placeholder="Warehouse Manager"
              value={contactData.position}
              onChange={handleContactChange}
            />

            <label>Phone Number</label>
            <input
              className="form-input"
              type="text"
              name="phoneNumber"
              placeholder="+1 (647) 504-0911"
              value={contactData.phoneNumber}
              onChange={handleContactChange}
            />

            <label>Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="glyon@instock.com"
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
            onClick={handleCancel} // Navigate back on cancel
          >
            Cancel
          </button>
          <button type="submit" className="btn-main save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default WarehouseEdit;
