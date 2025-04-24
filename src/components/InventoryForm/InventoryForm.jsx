import FormField from "../FormField/FormField.jsx";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import "./InventoryForm.scss"
import { useState, useEffect } from "react";
import HandleError from "../FormField/HandleError.jsx"
import axios from "axios";

const InventoryForm = () => {
    const [inventoryItem, setInventoryItem] = useState({
        item_name: "",
        description: "",
        category: "",
        status: "In Stock",
        quantity: "",
        warehouse_id: ""
      });
    
    const [categories,   setCategories]   = useState([]);
    const [warehouses,   setWarehouses]   = useState([]);
    const [isError,      setIsError]      = useState({});
    const [isDisabled,   setDisabled]     = useState(false);
    const [isFormSuccess,setFormSuccess]  = useState(false);
    
    const PORT = import.meta.env.VITE_PORT || "8080";

    const fetchCategories = async () => {
        try {
          const response = await axios.get(`http://localhost:${PORT}/api/categories`);
          setCategories(response.data);
        } catch (error) {
          console.log("Error fetching categories:", error.response?.data || error.message);
        }
    };
    
      const fetchWarehouses = async () => {
        try {
          const response = await axios.get(`http://localhost:${PORT}/api/warehouses`);
          setWarehouses(response.data);
        } catch (error) {
          console.log("Error fetching warehouses:", error.response?.data || error.message);
        }
    };
    
      useEffect(() => {
        fetchCategories();
        fetchWarehouses();
    }, []);
    

    const addInventoryDetails = [
        {label: "Item Name", class: "", type: "text", name: "item_name", placeholder: "Item Name", value: ""},
        {label: "Description", class: "", type: "textarea", name: "description", placeholder: "Please enter a brief item description", value: ""},
        {label: "Category",  class: "", type: "select", name: "category", placeholder: "Please select", value: "", options: [{label: "Please select"}, {label: "Electronics"}, {label: "Consumables"}, {label: "Gear"}]}
    ]
    const inventoryAvailableDetails = [
        { label: "Status", class: "", type: "radio", name: "status", value: "In Stock", options: [{value: "In Stock", label: "In Stock"}, {value: "Out of Stock", label: "Out of Stock"}] },
        {label: "Quantity", class: "", type: "text", name: "quantity", placeholder: "0", value: ""},
        {label: "Warehouse",  class: "", type: "select", name: "warehouse_id", placeholder: "Please select", value: "", options: [{label: "Please select"}, {label: "Mahattan"}, {label: "Toronto"}, {label: "New York"}]}
    ]

    const inventoryDetails = addInventoryDetails.map((field) => {
        if (field.name === "category") {
          return {
            ...field,
            options: categories.map((category) => ({
              value: category,
              label: category,
            })),
          };
        }
        return field;
    });

    const inventoryAvailability = inventoryAvailableDetails.map((field) => {
        if (field.name === "warehouse_id") {
          return {
            ...field,
            options: warehouses.map((warehouse) => ({
              value: warehouse.id,
              label: warehouse.warehouse_name,
            })),
          };
        }
        return field;
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInventoryItem(prev => ({ ...prev, [name]: value }));
        setDisabled(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // validate all fields (you already have HandleError)
        const { data, errors } = HandleError(e.target.elements);
        setIsError(errors);
        if (Object.values(errors).includes(true)) {
          setDisabled(true);
          return;
        }
    
        try {
          // post the inventoryItem object you built via handleOnChange
          console.log("Inventory item to be added", inventoryItem);
          const response = await axios.post(`http://localhost:${PORT}/api/inventories`, inventoryItem);
          console.log("Response data", response);
          if (response.status === 201) {
            console.log("Item added successfully")
            setIsError({});
            setFormSuccess(true);
            // reset the form, if you want:
            setInventoryItem({
              item_name: "",
              description: "",
              category: "",
              status: "In Stock",
              quantity: "",
              warehouse_id: ""
            });
            setTimeout(() => setFormSuccess(false), 3000);
          }
        } catch (error) {
          console.error("Failed to add inventory item", error.response?.data || error.message);
        }
    };

return(
    <div className="form__container form__container-inventory form__container-add">
        {/* NAVIGATION */}
        <div className="form__nav">
          <div className="back-link">
            <ArrowBack /> <h1 className="form__nav-header">Add New Inventory Item</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
        {isFormSuccess && (
            <div className="form__message">
              <span className={`badge badge-success`}>
                You have successfully added inventory
              </span>
            </div>
          )}
        <div className="form__fields">
        <div className="form__column form__column-left-inventory">
            <h2 className="form__header">Item Details</h2>
            {inventoryDetails.map((item, index) => (
                <FormField key={index} input={{
                    ...item,
                    error: isError[item.name],
                    value: inventoryItem[item.name],
                    onChange: handleOnChange,
                    }} />
            ))}
        </div>
        <div className="form__column">
            <h2 className="form__header">Item Availability</h2>
            {inventoryAvailability.map((item, index) => (
                <FormField key={index} input={{
                    ...item,
                    error: isError[item.name],
                    value: inventoryItem[item.name],
                    onChange: handleOnChange,
                }} />
            ))}
        </div>
        </div>
        <div className="footer-buttons">
            <button
              className="footer-buttons--cancel"
            >
                Cancel
            </button>
            <button className="footer-buttons--save">
              + Add Item
            </button>
            </div>
        </form>
        </div>
)
}

export default InventoryForm;