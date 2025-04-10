import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import SearchIcon from "../../../assets/Icons/search-24px.svg?react";
import ChevronRight from "../../../assets/Icons/chevron_right-24px.svg?react";
import DeleteIcon from "../../../assets/Icons/delete_outline-24px.svg?react";
import EditIcon from "../../../assets/Icons/edit-24px.svg?react";
import SortIcon from "../../../assets/Icons/sort-24px.svg?react";
import { ModalContext } from "../../context/context";
import './InventoryPage.scss';
import InStockTag from "../../components/InStockTag/InStockTag.jsx";
import OutOfStockTag from "../../components/OutOfStockTag/OutOfStockTag.jsx";


const InventoryPage = () => {
  const { setIsModal, setModalText } = useContext(ModalContext);
  const [searchQuery, setSearchQuery] = useState("");

  const callModalHandler = (text) => {
    setModalText(text);
    setIsModal(true);
  };

  const TABLE_HEADERS = [
    "INVENTORY ITEM",
    "CATEGORY",
    "STATUS",
    "QTY",
    "WAREHOUSE",
    "ACTIONS"
  ];

  const mockData = [
    {id: 1, item: "Television", category: "Electronics", status: "In Stock", qty: 500, warehouse: "Manhattan"},
    {id: 2, item: "Shrooms", category: "Consumables", status: "In Stock", qty: 900, warehouse: "Toronto"},
    {id: 3, item: "Leaf", category: "Consumables", status: "Out of Stock", qty: 0, warehouse: "Toronto"},
    {id: 4, item: "Coke", category: "Consumables", status: "Out of Stock", qty: 0, warehouse: "Toronto"},
    {id: 5, item: "Hoodie", category: "Gear", status: "Out of Stock", qty: 0, warehouse: "Seattle"}
  ]
    return (
      <>
      <section className="warehouses_list">
        <section className="header">
          <h1 className="header__title">Inventory</h1>

          <form className="header__search--inventory">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="header__search-text" placeholder="Search..."/>
            <SearchIcon className="header__search-icon" />
          </form>
          <button className="header__button">+ Add New Item</button>
        </section>
        </section>
        <table className="table">
          <thead className="table__header">
            <tr className="row">
              {TABLE_HEADERS.map((item, index) => (
                <th className="head" key={index}>
                  <div className="head__wrapper">
                  <span className="head__inventory">{item}</span>
                  <span className="head__icon"><SortIcon /></span>
                  </div>
                  </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <>
              <tr key={index} className="row">
              <td data-label = "INVENTORY ITEM" className="table-data-inventory">
              <Link to={`/warehouse/:id/item/:${item.id}`}>
                {item.item} 
                <span className="arrow-chevron"><ChevronRight /> </span>
                </Link>
                </td>
              <td data-label = "CATEGORY" className="table-data-inventory">{item.category}</td>
              <td data-label = "STATUS" className="table-data-inventory">{item.status === "In Stock" ? 
                <InStockTag className="instock-tag" /> 
                : <OutOfStockTag className="outofstock-tag" />}
                </td>
              <td data-label = "QTY" className="table-data-inventory">{item.qty}</td>
              <td data-label = "WAREHOUSE" className="table-data-inventory">{item.warehouse}</td>
              <td className="table-data-inventory__actions-tablet">
                <div className="actions_wrapper">
                <div className="delete">
                <DeleteIcon
                onClick={() => callModalHandler({header: `Delete ${item.item} inventory`, body: `Please confirm that you'd like to delete ${item.item} from the inventory list. You won't be able to undo this action.`})} />
                </div>
                <div className="edit">
                  <EditIcon />
                </div>
                </div>
              </td>
              </tr>
              {/* mobile layout responsive design for actions column */}
              <tr className="row-actions">
              <td className="table-data-inventory__actions">
                <div className="actions_wrapper">
                <div className="delete">
                <DeleteIcon
                onClick={() => callModalHandler({header: `Delete ${item.item} inventory`, body: `Please confirm that you'd like to delete ${item.item} from the inventory list. You won't be able to undo this action.`})} />
                </div>
                <div className="edit">
                  <EditIcon />
                </div>
                </div>
              </td>
              </tr>
              </>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  
export default InventoryPage;
  