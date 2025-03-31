import "./WarehouseEdit.scss";
import { Link } from "react-router-dom";
import Delete from "../../assets/Icons/delete_outline-24px.svg?react";
import ChevronRight from "../../assets/Icons/chevron_right-24px.svg?react";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import Edit from "../../assets/Icons/edit-24px.svg?react";
import EditWhite from "../../assets/Icons/edit-white-24px.svg?react";
import Sort from "../../assets/Icons/sort-24px.svg?react";
import InStockTag from "../InStockTag/InStockTag";
import OutOfStockTag from "../OutOfStockTag/OutOfStockTag";

const TABLE_HEAD = [
  "INVENTORY ITEM",
  "Category",
  "Status",
  "Quantity",
  "Actions",
];

const TABLE_DATA = [
  { item: "Laptop", category: "Electronics", status: "In Stock", quantity: 10 },
  {
    item: "Office Chair",
    category: "Furniture",
    status: "Low Stock",
    quantity: 3,
  },
  {
    item: "Notebook",
    category: "Stationery",
    status: "Out of Stock",
    quantity: 0,
  },
  {
    item: "Headphones",
    category: "Electronics",
    status: "In Stock",
    quantity: 25,
  },
  {
    item: "Whiteboard",
    category: "Office Supplies",
    status: "In Stock",
    quantity: 7,
  },
];

const WarehouseEdit = () => {
  return (
    <div className="table__container">
      {/* NAVIGATION */}
      <div className="table__nav">
        <div className="back-link">
          <ArrowBack /> <h1 className="table__nav-header">Edit Warehouse</h1>
        </div>
      </div>

      <div className="table__warehouse-details">
        {/* WAREHOUSE DETAILS COLUMN*/}
        <div className="table__address">
          <h2 className="warehouse_label">Warehouse Details</h2>

          <label>Warehouse Name</label>
          <input className="form-input" type="text" defaultValue="Washington" />

          <label>Street Address</label>
          <input className="form-input" type="text" defaultValue="33 Pearl Street SW" />

          <label>City</label>
          <input className="form-input" type="text" defaultValue="Washington" />

          <label>Country</label>
          <input className="form-input" type="text" defaultValue="USA" />
        </div>

        {/* CONTACT DETAILS CONTAINER */}
        <div className="table__contact-info">
          <h2 className="warehouse_label">Contact Details</h2>
          <label>Contact Name</label>
          <input className="form-input" type="text" defaultValue="Graeme Lyon" />
          
          <label>Position</label>
          <input className="form-input" type="text" defaultValue="Warehouse Manager" />
          
          <label>Phone Number</label>
          <input className="form-input" type="text" defaultValue="+1 (647) 504-0911" />
          
          <label>Email</label>
          <input className="form-input" type="email" defaultValue="glyon@instock.com" />
          
        </div>
        
      </div>
      <button className="btn-main edit-btn"><EditWhite /> Edit</button>
        <button className="btn-main edit-btn"><EditWhite /> Edit</button>
    </div>
  );
};

export default WarehouseEdit;
