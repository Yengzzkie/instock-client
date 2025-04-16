import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./WarehouseEdit.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";

const WarehouseEdit = () => {
  const { id } = useParams();
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

  // Fetch warehouse info
  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/warehouses/${id}`
        );
        const data = response.data;

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
  }, [id]);

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

    // Regex validations
    const phoneRegex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !payload.warehouse_name ||
      !payload.address ||
      !payload.city ||
      !payload.country ||
      !payload.contact_name ||
      !payload.contact_position ||
      !payload.contact_phone ||
      !payload.contact_email
    ) {
      alert("All fields are required.");
      return;
    }

    if (!phoneRegex.test(payload.contact_phone)) {
      alert("Invalid phone number.");
      return;
    }

    if (!emailRegex.test(payload.contact_email)) {
      alert("Invalid email address.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/warehouses/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200)
        throw new Error("Failed to update warehouse details");

      alert("Warehouse details updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setWarehouseData(initialWarehouseData);
    setContactData(initialContactData);
    navigate(-1);
  };

  return (
    <div className="editWarehouse">
      <div className="form__container">
        <div className="form__nav">
          <div className="back-link">
            <ArrowBack onClick={() => navigate(-1)} />
            <h1 className="form__nav-header">Edit Warehouse</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form__warehouse-details">
          <div className="form">
            <div className="form__address">
              <h2 className="warehouse_label">Warehouse Details</h2>

              <label>Warehouse Name</label>
              <input
                className="form-input"
                type="text"
                name="warehouseName"
                placeholder={warehouseData.warehouseName}
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

          <div className="form__buttons">
            <button
              type="button"
              className="btn-main cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-main save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseEdit;
