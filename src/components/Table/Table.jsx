import "./Table.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../context/context";
import Delete from "../../assets/Icons/delete_outline-24px.svg?react";
import ChevronRight from "../../assets/Icons/chevron_right-24px.svg?react";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import Edit from "../../assets/Icons/edit-24px.svg?react";
import EditWhite from "../../assets/Icons/edit-white-24px.svg?react";
import Sort from "../../assets/Icons/sort-24px.svg?react";
import InStockTag from "../InStockTag/InStockTag";
import OutOfStockTag from "../OutOfStockTag/OutOfStockTag";
import DeleteModal from "../DeleteModal/DeleteModal";

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

const Table = () => {
  const { setIsModal, setSelectedItem } = useContext(ModalContext);

  return (
    <div className="table__container">
      {/* NAVIGATION */}
      <div className="table__nav">
        <div className="back-link">
          <ArrowBack /> <h1 className="table__nav-header">Washington</h1>
        </div>
        <button className="btn-main edit-btn">
          <EditWhite /> Edit
        </button>
      </div>

      <div className="table__warehouse-details">
        {/* WAREHOUSE ADDRESS CONTAINER */}
        <div className="table__address">
          <p className="warehouse_label">WAREHOUSE ADDRESS:</p>
          <p>666 Inferno St.</p>
          <span>Tonshingwa</span>
          <span>, </span>
          <span>Japan</span>
        </div>

        {/* CONTACT INFORMATION CONTAINER */}
        <div className="table__contact-info">
          {/* CONTACT NAME */}
          <div className="contact-name">
            <p className="warehouse_label">CONTACT NAME:</p>
            <p>Lucy Fier</p>
            <p>Floor Manager</p>
          </div>
          {/* CONTACT NUMBER */}
          <div className="contact-number">
            <p className="warehouse_label">CONTACT INFORMATION:</p>
            <p>+1 800-666-1313</p>
            <p>go2hell@email.com</p>
          </div>
        </div>
      </div>

      <table>
        {/* TABLE HEADER */}
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={index}>
                <td>
                  {head.toUpperCase()} <Sort />
                </td>
              </th>
            ))}
          </tr>
        </thead>
        {/* TABLE BODY */}
        <tbody>
          {TABLE_DATA.map((row, index) => (
            <tr key={index}>
              <td className="table__item-name">
                <Link>{row.item}</Link> <ChevronRight />
              </td>
              <td>{row.category}</td>
              <td>{row.quantity !== 0 ? <InStockTag /> : <OutOfStockTag />}</td>
              <td>{row.quantity}</td>
              <td>
                <Delete
                  onClick={() => {
                    setSelectedItem(row.item); // Set selected item name
                    setIsModal(true);
                  }}
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

export default Table;
