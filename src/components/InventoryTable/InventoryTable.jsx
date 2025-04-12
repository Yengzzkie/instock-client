import "./InventoryTable.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/context";
import { useParams } from "react-router-dom";
import axios from "axios";
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

const InventoryTable = () => {
  const { setIsModal, setModalText } = useContext(ModalContext);
  const { id } = useParams();
  const PORT = import.meta.env.PORT;
  const [inventoryData, setInventoryData] = useState([]);
  const [warehouseData, setWarehouseData] = useState({});

  // function for getting all available inventory for particular warehouse
  async function getInventoryData() {
    try {
      const response = await axios.get(
        `http://localhost:${PORT}/api/warehouses/${id}/inventories`
      );

      setInventoryData(response.data);
    } catch (error) {
      console.error(`Failed to get inventory for warehouse with ID ${id}:`,error);
    }
  }

  // function for getting the data for a warehouse
  async function getWarehouseData() {
    try {
      const response = await axios.get(`http://localhost:${PORT}/api/warehouses/${id}`);

      setWarehouseData(response.data);
    } catch (error) {
      console.error(`Failed to get data for warehouse with ID ${id}:`, error);
    }
  }

  useEffect(() => {
    getInventoryData();
    getWarehouseData();
  }, []);

  // this function will handle the text content of the modal by setting the setModalText
  // to whatever is passed on to the 'text' parameter
  // This method will make the Modal reusable
  const callModalHandler = (text) => {
    setModalText(text);
    setIsModal(true);
  };

  return (
    <div className="table__container">
      {/* NAVIGATION */}
      <div className="table__nav">
        <Link to={`/warehouse/`}>
          <div className="back-link">
            <ArrowBack />{" "}
            <h1 className="table__nav-header">
              {warehouseData.warehouse_name}
            </h1>
          </div>
        </Link>
        <button className="btn-main edit-btn">
          <EditWhite /> Edit
        </button>
      </div>

      <div className="table__warehouse-details">
        {/* WAREHOUSE ADDRESS CONTAINER */}
        <div className="table__address">
          <p className="warehouse_label">WAREHOUSE ADDRESS:</p>
          <p>{warehouseData.address}</p>
          <span>{warehouseData.city}</span>
          <span>, </span>
          <span>{warehouseData.country}</span>
        </div>

        {/* CONTACT INFORMATION CONTAINER */}
        <div className="table__contact-info">
          {/* CONTACT NAME */}
          <div className="contact-name">
            <p className="warehouse_label">CONTACT NAME:</p>
            <p>{warehouseData.contact_name}</p>
            <p>{warehouseData.contact_position}</p>
          </div>
          {/* CONTACT NUMBER */}
          <div className="contact-number">
            <p className="warehouse_label">CONTACT INFORMATION:</p>
            <p>{warehouseData.contact_phone}</p>
            <p>{warehouseData.contact_email}</p>
          </div>
        </div>
      </div>

      <table className="inventory__table">
        {/* TABLE HEADER */}
        <thead className="inventory__table-head">
          <tr className="inventory__table-row">
            {TABLE_HEAD.map((head, index) => (
              <th className="inventory__table-header" key={index}>
                <span>
                  {head.toUpperCase()} <Sort />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        {/* TABLE BODY */}
        <tbody className="inventory__table-body">
          {inventoryData.map((row, index) => (
            <tr className="inventory__table-row" key={index}>
              <td
                data-label="item"
                className="table__item-name inventory__table-data"
              >
                <Link
                  state={{ warehouseName: warehouseData.warehouse_name }}
                  to={`/warehouse/${id}/item/${row.id}`}
                >
                  {row.item_name}
                </Link>{" "}
                <ChevronRight />
              </td>
              <td data-label="category" className="inventory__table-data">
                {row.category}
              </td>
              <td data-label="status" className="inventory__table-data">
                {row.quantity !== 0 ? <InStockTag /> : <OutOfStockTag />}
              </td>
              <td data-label="quantity" className="inventory__table-data">
                {row.quantity}
              </td>
              <td data-label="Action" className="inventory__table-data">
                <Delete
                  onClick={() =>
                    callModalHandler({
                      header: `Delete ${row.item_name} inventory item`,
                      body: `Please confirm that you'd like to delete ${row.item} from the inventory list. You won't be able to undo this action.`,
                    })
                  }
                  className="table__cta-delete"
                />
                <Edit className="table__cta-edit" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
