import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import SearchIcon from "../../../assets/Icons/search-24px.svg?react";
import ChevronRight from "../../../assets/Icons/chevron_right-24px.svg?react";
import DeleteIcon from "../../../assets/Icons/delete_outline-24px.svg?react";
import EditIcon from "../../../assets/Icons/edit-24px.svg?react";
import SortIcon from "../../../assets/Icons/sort-24px.svg?react";
import CloseIcon from "../../../assets/Icons/close-24px.svg?react";
import { ModalContext } from "../../context/context";
import "./InventoryPage.scss";
import InStockTag from "../../components/InStockTag/InStockTag.jsx";
import OutOfStockTag from "../../components/OutOfStockTag/OutOfStockTag.jsx";

const InventoryPage = () => {
  const PORT = import.meta.env.VITE_PORT || 8080;
  const navigate = useNavigate();
  const { setIsModal, setModalText } = useContext(ModalContext);
  const [inventoryList, setInventoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [ascending, setAscending] = useState(false);

  const callModalHandler = (text) => {
    setModalText(text);
    setIsModal(true);
  };

  const getInventory = async () => {
    const response = await axios.get(
      `http://localhost:${PORT}/api/inventories`
    );
    setInventoryList(response.data);
    setFilteredInventory(response.data);
  };

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    setFilteredInventory(inventoryList);
  }, [inventoryList]);

  const TABLE_HEADERS = [
    "INVENTORY ITEM",
    "CATEGORY",
    "STATUS",
    "QTY",
    "WAREHOUSE",
    "ACTIONS",
  ];

  const handleSort = (sortingParam, sortOrder) => {
    if (sortOrder === true) {
      filteredInventory.sort((a, b) => {
        if (a[sortingParam].toLowerCase() < b[sortingParam].toLowerCase()) {
          return -1;
        }
        if (b[sortingParam].toLowerCase() < a[sortingParam].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    } else {
      filteredInventory.sort((a, b) => {
        if (b[sortingParam].toLowerCase() < a[sortingParam].toLowerCase()) {
          return -1;
        }
        if (a[sortingParam].toLowerCase() < b[sortingParam].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    }
    setInventoryList(filteredInventory);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);

    const filteredResults = inventoryList.filter(
      (item) =>
        item.item_name.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue) ||
        item.quantity.toString().toLowerCase().includes(searchValue) ||
        item.warehouse_name.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue)
    );

    setFilteredInventory(filteredResults);
  };
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredInventory(inventoryList);
  };

  const deleteInventory = async (inventoryId) => {
    try {
      await axios.delete(
        `http://localhost:${PORT}/api/inventories/${inventoryId}`
      );
    } catch (error) {
      console.error(
        `Failed to delete warehouse with ID ${inventoryId}:`,
        error
      );
    } finally {
      setIsModal(false);
      getInventory();
    }
  };

  return (
    <>
      <section className="warehouses_list">
        <section className="header">
          <h1 className="header__title">Inventory</h1>

          <div className="header__actions">
            <form className="header__search header__search--inventory">
              <input
                value={searchQuery}
                onChange={handleSearch}
                className="header__search-text"
                placeholder="Search..."
              />
              {searchQuery ? (
                <CloseIcon
                  className="header__search-icon"
                  onClick={clearSearch}
                />
              ) : (
                <SearchIcon className="header__search-icon" />
              )}
            </form>
            <button className="header__button" onClick={() => navigate('/inventory/add')}>+ Add New Item</button>
          </div>
        </section>
      </section>
      <table className="table">
        <thead className="table__header">
          <tr className="row">
            {TABLE_HEADERS.map((item, index) => (
              <th className="head" key={index}>
                <div className="head__wrapper">
                  <span className="head__inventory">{item}</span>
                  <span className="head__icon">
                    <SortIcon
                      onClick={() => {
                        const newAscending = !ascending;
                        setAscending(newAscending);
                        handleSort(item, newAscending);
                      }}
                    />
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr className="row" key={item.id}>
              <td data-label="INVENTORY ITEM" className="table-data-inventory">
                <Link to={`/warehouse/${item?.warehouse_id}/item/${item.id}`}>
                  {item.item_name}
                  <span className="arrow-chevron">
                    <ChevronRight />{" "}
                  </span>
                </Link>
              </td>
              <td data-label="CATEGORY" className="table-data-inventory">
                {item.category}
              </td>
              <td data-label="STATUS" className="table-data-inventory">
                {item.status === "In Stock" && item.quantity > 0 ? (
                  <InStockTag className="instock-tag" />
                ) : (
                  <OutOfStockTag className="outofstock-tag" />
                )}
              </td>
              <td data-label="QTY" className="table-data-inventory">
                {item.status === "In Stock" ? item.quantity : 0}
              </td>
              <td data-label="WAREHOUSE" className="table-data-inventory">
                {item.warehouse_name}
              </td>
              <td className="table-data-inventory">
                <div className="actions_wrapper">
                  <div className="delete">
                    <DeleteIcon
                      onClick={() =>
                        callModalHandler({
                          header: `Delete ${item.item_name} inventory`,
                          body: `Please confirm that you'd like to delete ${item.item_name} from the inventory list. You won't be able to undo this action.`,
                          deleteCallback: () => deleteInventory(item.id),
                        })
                      }
                    />
                  </div>
                  <div className="edit">
                    <Link to={`/inventory/edit/${item.id}`}>
                      <EditIcon className="edit-icon table-edit" />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InventoryPage;
