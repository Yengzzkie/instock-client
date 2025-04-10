import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./InventoryEdit.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import FormField from "../FormField/FormField.jsx";

const InventoryEdit = () => {
  const URL = import.meta.env.VITE_URL;
  const PORT = import.meta.env.VITE_PORT;

  const { id } = useParams();
  const [isError, setIsError] = useState({});
  
  const [inventoryItem, setInventoryItem] = useState([]);

  const fetchInventoryItem = async () => {
    try {
      console.log(`${URL}:${PORT}/inventory/${id}`);
    } catch(error) {
      console.log("Error fetching inventory:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    fetchInventoryItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value.trim();
    const status = form.status.value.trim();
    const quantity = form.quantity.value.trim();
    const warehouses = form.warehouses.value.trim();

    const errors = {
      name: !name,
      description: !description,
      category: !category,
      status: !status,
      quantity: !quantity,
      warehouses: !warehouses
    };

    setIsError(errors);
  };

  // --- Fields ---
  const inventoryDetails = [
    { label: "Item Name", class: "", type: "input", name: "name", placeholder: "Item Name", value: "", /* onChange: "",*/ },
    { label: "Description", class: "", type: "textarea", name: "description", placeholder: "Description", value: "", /* onChange: "", */ },
    { label: "Category", class: "", type: "select", name: "category", placeholder: "Category", value: "", /* onChange: "", */
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ]
    },
  ];

  const inventoryAvailability = [
    { label: "Status", class: "", type: "radio", name: "status", placeholder: "Status", value: "Out of Stock", /* onChange: "", */
      options: [
        { value: "In Stock", label: "In Stock" },
        { value: "Out of Stock", label: "Out of Stock" },
      ]
    },
    { label: "Quantity", class: "", type: "number", name: "quantity", placeholder: "Quantity", value: "", /* onChange: "", */ },
    { label: "Warehouse", class: "", type: "select", name: "warehouses", placeholder: "Warehouse", value: "", /* onChange: "", */
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ]
    }
  ];
  
  return ( 
    <>
      <div className="form__container form__container-inventory">
        {/* NAVIGATION */}
        <div className="form__nav">
          <div className="back-link">
            <ArrowBack /> <h1 className="form__nav-header">Edit Inventory Item</h1>
          </div>
        </div>
  
        <form onSubmit={handleSubmit} className="form">
          {/* FORM FIELDS */}
          <div className="form__fields">

            {/* INVENTORY ITEM DETAILS COLUMN */}
            <div className="form__column form__column-left">
              <h2 className="form__header">Item Details</h2>

              {inventoryDetails.map((params, index) => (
                <FormField key={index} input={{...params, error: isError[params.name]}} />
              ))}
            </div>

            {/* ITEM AVAILABILITY CONTAINER */}
            <div className="form__column">
              <h2 className="form__header">Item Availability</h2>

              {inventoryAvailability.map((params, index) => (
                <FormField key={index} input={{...params, error: isError[params.name]}} />
              ))}
            </div>
          </div>

          {/* BUTTONS INSIDE FORM */}
          <div className="form__buttons">
            <button
              type="button"
              className="btn-main cancel-btn"
              // onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-main save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
   );
}
 
export default InventoryEdit;