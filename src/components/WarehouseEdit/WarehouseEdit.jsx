import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./WarehouseEdit.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";

const WarehouseEdit = () => {
  const PORT = import.meta.env.VITE_PORT || "8080";
  const URL = `http://localhost:${PORT}`;
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
          `${URL}/api/warehouses/${id}`
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
        // alert("Failed to load warehouse data");
      }
    };

    fetchWarehouseData();
  }, [id]);

  const handleWarehouseChange = (e) => {
    setWarehouseData({ ...warehouseData, [e.target.name]: e.target.value });
    console.log(warehouseData);
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
        `${URL}/api/warehouses/${id}`,
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
    } catch (error) {
      console.error(error);
      // alert("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
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
            <ArrowBack onClick={() => navigate(-1)} /> <h1 className="form__nav-header">Edit Warehouse</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form form__warehouse-details">
          <div className="form__fields">
            <div className="form__column form__column-left">
              <h2 className="form__header">Warehouse Details</h2>

              <div className="form__group">
                <label className="form-label">Warehouse Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="warehouseName"
                  placeholder={warehouseData.warehouseName}
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
                  placeholder="33 Pearl Street SW"
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
                  placeholder="Washington"
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
                  placeholder="USA"
                  value={warehouseData.country}
                  onChange={handleWarehouseChange}
                />
              </div>
            </div>

            <div className="form__column">
              <h2 className="form__header">Contact Details</h2>

              <div className="form__group">
                <label className="form-label">Contact Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="contactName"
                  placeholder="Graeme Lyon"
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
                  placeholder="Warehouse Manager"
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
                  placeholder="+1 (647) 504-0911"
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
                  placeholder="glyon@instock.com"
                  value={contactData.email}
                  onChange={handleContactChange}
                />
              </div>
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
