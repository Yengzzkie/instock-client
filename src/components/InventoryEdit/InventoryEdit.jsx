import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./InventoryEdit.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import FormField from "../FormField/FormField.jsx";
import HandleError from "../FormField/HandleError.jsx";
import Fields from "./InventoryFields.json";

const InventoryEdit = () => {
  const PORT = import.meta.env.VITE_PORT || "8080";
  const URL = `http://localhost:${PORT}`;

  const { id } = useParams();
  const [isError, setIsError] = useState({});
  const [isDisabled, setDisabled] = useState(false);
  const [isFormSuccess, setFormSuccess] = useState(false);

  const [inventoryItem, setInventoryItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouse] = useState([]);

  const navigate = useNavigate();

  const fetchInventoryItem = async () => {
    try {
      const response = await axios.get(`${URL}/api/inventories/${id}`);
      setInventoryItem(response.data);
    } catch (error) {
      console.log(
        "Error fetching inventory:",
        error.response?.data || error.message
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.log(
        "Error fetching categories:",
        error.response?.data || error.message
      );
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${URL}/api/warehouses`);
      setWarehouse(response.data);
    } catch (error) {
      console.log(
        "Error fetching warehouses:",
        error.response?.data || error.message
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error.response?.data || error.message);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${URL}/api/warehouses`);
      setWarehouse(response.data);
    } catch (error) {
      console.log("Error fetching warehouses:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchInventoryItem();
    fetchCategories();
    fetchWarehouses();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, errors } = HandleError(e.target.elements);
    setIsError(errors);
    setInventoryItem((prev) => ({ ...prev, ...data }));

    if (Object.values(errors).includes(true)) {
      setDisabled(true);
      return;
    }
    setDisabled(false);

    try {
      const response = await axios.patch(`${URL}/api/inventories/${id}`, {
        warehouse_id: inventoryItem.warehouse_id,
        item_name: inventoryItem.item_name,
        description: inventoryItem.description,
        category: inventoryItem.category,
        status: inventoryItem.status,
        quantity: inventoryItem.quantity,
      });

      if (response.status === 200) {
        await fetchInventoryItem();
        setIsError({});
        setFormSuccess(true);

        setTimeout(() => {
          setFormSuccess(false);
        }, 3000);

        console.log("success");
      }
    } catch (error) {
      console.error(
        "Failed to edit inventory:",
        error.response?.data || error.message
      );
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInventoryItem((prev) => ({ ...prev, [name]: value }));
    setDisabled(false);
  };

  // --- Fields ---
  // getting the fields from the InventoryFields.json file
  const inventoryDetails = Fields.inventoryDetails.map((field) => {
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
  const inventoryAvailability = Fields.inventoryAvailability.map((field) => {
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

  return (
    <>
      <div className="form__container form__container-inventory">
        {/* NAVIGATION */}
        <div className="form__nav">
          <div className="back-link">
            <ArrowBack onClick={() => navigate(-1)} />{" "}
            <h1 className="form__nav-header">Edit Inventory Item</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {isFormSuccess && (
            <div className="form__message">
              <span className={`badge badge-success`}>
                You have successfully edited inventory
              </span>
            </div>
          )}

          {/* FORM FIELDS */}
          <div className="form__fields">
            {/* INVENTORY ITEM DETAILS COLUMN */}
            <div className="form__column form__column-left">
              <h2 className="form__header">Item Details</h2>

              {inventoryDetails.map((params, index) => (
                <FormField
                  key={index}
                  input={{
                    ...params,
                    value: inventoryItem[params.name],
                    error: isError[params.name],
                    onChange: handleOnChange,
                  }}
                />
              ))}
            </div>

            {/* ITEM AVAILABILITY CONTAINER */}
            <div className="form__column">
              <h2 className="form__header">Item Availability</h2>

              {inventoryAvailability.map((params, index) => {
                if (
                  inventoryItem.status === "Out of Stock" &&
                  params.name === "quantity"
                ) {
                  return null;
                }

                return (
                  <FormField
                    key={index}
                    input={{
                      ...params,
                      value: inventoryItem[params.name],
                      error: isError[params.name],
                      onChange: handleOnChange,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* BUTTONS INSIDE FORM */}
          <div className="form__buttons">
            <button
              type="button"
              className="btn-main cancel-btn"
              onClick={() => navigate("/inventory")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn-main save-btn ${isDisabled ? "disabled" : ""}`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InventoryEdit;
