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
import Sort from "../../assets/Icons/sort-24px.svg?react";
import InStockTag from "../InStockTag/InStockTag";
import OutOfStockTag from "../OutOfStockTag/OutOfStockTag";
import EditButton from "../EditButton/EditButton";

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
  const PORT = import.meta.env.VITE_PORT || 8000;
  const [inventoryData, setInventoryData] = useState([]);
  const [warehouseData, setWarehouseData] = useState({});

  // function for getting all available inventory for particular warehouse
  async function getInventoryData() {
    try {
      const response = await axios.get(`http://localhost:${PORT}/api/warehouses/${id}/inventories`);

      setInventoryData(response.data);
    } catch (error) {
      console.error(
        `Failed to get inventory for warehouse with ID ${id}:`,
        error
      );
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

  // function for deleting an inventory item
  // this function will be called when the delete button is clicked in the delete modal
  async function deleteItem(itemId) {
    try {
      await axios.delete(`http://localhost:${PORT}/api/inventories/${itemId}`);
    } catch (error) {
      console.error(`Failed to delete inventory item with ID ${itemId}:`, error);
    } finally {
      setIsModal(false);
      getInventoryData();
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
        <EditButton path={`/warehouse/edit/${id}`} />
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
          {inventoryData.map((item) => (
            <tr className="inventory__table-row" key={item.id}>
              <td
                data-label="item"
                className="table__item-name inventory__table-data"
              >
                <Link
                  state={{ warehouseName: warehouseData.warehouse_name }}
                  to={`/warehouse/${id}/item/${item.id}`}
                >
                  {item.item_name}
                </Link>{" "}
                <ChevronRight />
              </td>
              <td data-label="category" className="inventory__table-data">
                {item.category}
              </td>
              <td data-label="status" className="inventory__table-data">
                {item.status === "In Stock" ? <InStockTag /> : <OutOfStockTag />}
              </td>
              <td data-label="quantity" className="inventory__table-data">
                {item.status === "Out of Stock" ? 0 : item.quantity}
              </td>
              <td data-label="Action" className="inventory__table-data">
                <Delete
                  onClick={() =>
                    callModalHandler({
                      header: `Delete ${item.item_name} inventory item`,  // this serves as the header of the modal
                      body: `Please confirm that you'd like to delete ${item.item_name} from the inventory list. You won't be able to undo this action.`, // this serves as the body of the modal
                      data: item, // this will be used to pass the data of the item to the modal
                      deleteCallback: () => deleteItem(item.id), // this will be used to call the delete function from inside the delete modal
                    })
                  }
                  className="table__cta-delete"
                />
                <Link to={`/inventory/edit/${item.id}`}>
                  <Edit className="table__cta-edit" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
