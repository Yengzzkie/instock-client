import FormField from "../FormField/FormField.jsx";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import "./InventoryForm.scss"
import { useState } from "react";

const InventoryForm = () => {
    const [itemName, setItemName] = useState("");

    const addInventoryDetails = [
        {label: "Item Name", class: "", type: "input", name: "itemName", placeholder: "Item Name", value: ""},
        {label: "Description", class: "", type: "textarea", name: "description", placeholder: "Please enter a brief item description", value: ""},
        {label: "Category",  class: "", type: "select", name: "category", placeholder: "Please select", value: "", options: [{label: "Please select"}, {label: "Electronics"}, {label: "Consumables"}, {label: "Gear"}]}
    ]
    const inventoryAvailableDetails = [
        { label: "Status", class: "", type: "radio", name: "status", value: "In Stock", options: [{value: "In Stock", label: "In Stock"}, {value: "Out of Stock", label: "Out of Stock"}] },
        {label: "Quantity", class: "", type: "input", name: "quantity", placeholder: "0", value: ""},
        {label: "Warehouse",  class: "", type: "select", name: "warehouse", placeholder: "Please select", value: "", options: [{label: "Please select"}, {label: "Mahattan"}, {label: "Toronto"}, {label: "New York"}]}
    ]

return(
    <div className="form__container form__container-inventory form__container-add">
        {/* NAVIGATION */}
        <div className="form__nav">
          <div className="back-link">
            <ArrowBack /> <h1 className="form__nav-header">Add New Inventory Item</h1>
          </div>
        </div>
        <form className="form">
        <div className="form__fields">
        <div className="form__column form__column-left-inventory">
            <h2 className="form__header">Item Details</h2>
            {addInventoryDetails.map((item, index) => (
                <FormField key={index} input={{
                    ...item
                    }} />
            ))}
        </div>
        <div className="form__column">
            <h2 className="form__header">Item Availability</h2>
            {inventoryAvailableDetails.map((item, index) => (
                <FormField key={index} input={{
                    ...item
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