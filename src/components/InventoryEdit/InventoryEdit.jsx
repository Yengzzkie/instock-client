import { useState } from "react";
import { useParams } from "react-router-dom";
import "./InventoryEdit.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import FormField from "../FormField/FormField.jsx";

const InventoryEdit = () => {
  const { itemID } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

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

              <FormField input={{
                label: "Item Name",
                class: "",
                type: "input",
                name: "name", 
                placeholder: "Item Name",
                value: "",
                // onChange: "",
                }}
              />
              
              <FormField input={{
                label: "Description",
                class: "",
                type: "textarea",
                name: "description", 
                placeholder: "Description",
                value: "",
                // onChange: "",
                }}
              />
              
              <FormField input={{
                label: "Category",
                class: "",
                type: "select",
                name: "category", 
                placeholder: "Category",
                value: "",
                // onChange: "",

                options: [
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]
                }}
              />
            </div>

            {/* ITEM AVAILABILITY CONTAINER */}
            <div className="form__column">
              <h2 className="form__header">Item Availability</h2>

              <FormField input={{
                label: "Status",
                class: "",
                type: "radio",
                name: "status", 
                placeholder: "Status",
                value: "Out of Stock",
                // onChange: "",

                options: [
                  { value: "In Stock", label: "In Stock" },
                  { value: "Out of Stock", label: "Out of Stock" },
                ]
                }}
              />

              {/* Show only if Status is set to In Stock */}
              <FormField input={{
                label: "Quantity",
                class: "",
                type: "number",
                name: "quantity", 
                placeholder: "Quantity",
                value: "500",
                // onChange: "",
                }}
              />

              <FormField input={{
                label: "Warehouse",
                class: "",
                type: "select",
                name: "warehouses", 
                placeholder: "warehouse",
                value: "",
                // onChange: "",

                options: [
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]
                }}
              />
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