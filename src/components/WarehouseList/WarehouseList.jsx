import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from "../../../assets/Icons/search-24px.svg?react";
import CloseIcon from "../../../assets/Icons/close-24px.svg?react";
import ChevronRight from "../../../assets/Icons/chevron_right-24px.svg?react";
import Delete from "../../../assets/Icons/delete_outline-24px.svg?react";
import Edit from "../../../assets/Icons/edit-24px.svg?react";
import Sort from "../../../assets/Icons/sort-24px.svg?react";
import "./WarehouseList.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../context/context";

const TABLE_HEAD = [
  "WAREHOUSE",
  "ADDRESS",
  "CONTACT NAME",
  "CONTACT INFORMATION",
  "Actions",
];

const WarehouseList = () => {
  const PORT = import.meta.env.VITE_PORT || 8080;
  const URL = `http://localhost:${PORT}`;
  const { setIsModal, setModalText } = useContext(ModalContext);
  const [wareHouses, setWarehouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ascending, setAscending] = useState(false);
  const [filteredWarehouses, setFilteredWarehouses] = useState(wareHouses);

  const navigate = useNavigate();

  const getWarehouses = async () => {
    try {
      const response = await axios.get(`${URL}/api/warehouses`);
      setWarehouses(response.data);
      setFilteredWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  const callModalHandler = (text) => {
    setModalText(text);
    setIsModal(true);
  };

  // search functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);

    const filteredResults = wareHouses.filter(
      (item) =>
        item.warehouse_name.toLowerCase().includes(searchValue) ||
        item.address.toLowerCase().includes(searchValue) ||
        item.city.toLowerCase().includes(searchValue) ||
        item.country.toLowerCase().includes(searchValue) ||
        item.contact_name.toLowerCase().includes(searchValue) ||
        item.contact_email.toLowerCase().includes(searchValue) ||
        item.contact_phone.toLowerCase().includes(searchValue)
    );

    setFilteredWarehouses(filteredResults);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredWarehouses(wareHouses);
  };

  // sorting functionality
  const handleSort = (sortingParam, sortOrder) => {
    if (sortOrder === true) {
      filteredWarehouses.sort((a, b) => {
        if (a[sortingParam].toLowerCase() < b[sortingParam].toLowerCase()) {
          return -1;
        }
        if (b[sortingParam].toLowerCase() < a[sortingParam].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    } else {
      filteredWarehouses.sort((a, b) => {
        if (b[sortingParam].toLowerCase() < a[sortingParam].toLowerCase()) {
          return -1;
        }
        if (a[sortingParam].toLowerCase() < b[sortingParam].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    }
    setWarehouses(filteredWarehouses);
  };

  // function for deleting a warehouse
  // this function will be called when the delete button is clicked in the delete modal
  async function deleteWarehouse(warehouseId) {
    try {
      await axios.delete(`http://localhost:${PORT}/api/warehouses/${warehouseId}`);
    } catch (error) {
      console.error(`Failed to delete warehouse with ID ${warehouseId}:`, error);
    } finally {
      setIsModal(false);
      getWarehouses();
    }
  }
  
  return (
    <>
      <section className="warehouses_list table__container">
        <section className="header">
          <h1 className="header__title">Warehouses</h1>
          <div className="header__actions">
            <form className="header__search">
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
            <button className="header__button" onClick={() => navigate(`add`)}>+ Add New Warehouse</button>
          </div>
        </section>
        
        <table className="inventory__table">
          {/* TABLE HEADER */}
          <thead className="inventory__table-head">
            <tr className="inventory__table-row">
              {TABLE_HEAD.map((head, index) => (
                <th className="inventory__table-header" key={index}>
                  <span>
                    {head.toUpperCase()} 
                      <Sort
                        onClick={() => {
                          const newAscending = !ascending;
                          setAscending(newAscending);
                          handleSort("warehouse_name", newAscending);
                        }}
                        className="sort-icon"
                      />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {/* TABLE BODY */}
          <tbody className="inventory__table-body">
            {filteredWarehouses.map((item) => (
              <tr className="inventory__table-row" key={item.id}>
                <td
                  data-label="WAREHOUSE"
                  className="table__item-name inventory__table-data"
                >
                  <Link
                    state={item.name}
                    to={`/warehouse/${item.id}`}
                  >
                    {item.warehouse_name}
                  </Link>{" "}
                  <ChevronRight />
                </td>
                <td data-label="ADDRESS" className="inventory__table-data">
                  {item.address}, {item.city},{" "}
                  {item.country}
                </td>
                <td data-label="CONTACT NAME" className="inventory__table-data">
                  {item.contact_name}
                </td>
                <td data-label="CONTACT INFORMATION" className="inventory__table-data">
                  <div>{item.contact_phone}</div>
                  <div>{item.contact_email}</div>
                </td>
                <td data-label="Action" className="inventory__table-data">
                  <Delete
                    onClick={() =>
                      callModalHandler({
                        header: `Delete ${item.warehouse_name} warehouse?`,  // this serves as the header of the modal
                        body: `Please confirm that you'd like to delete the ${item.warehouse_name} from the list of warehouses. You won't be able to undo this action.`, // this serves as the body of the modal
                        data: item, // this will be used to pass the data to the modal
                        deleteCallback: () => deleteWarehouse(item.id), // this will be used to call the delete function from inside the Delete Modal
                      })
                    }
                    className="table__cta-delete"
                  />
                  <Edit 
                    className="table__cta-edit"
                    onClick = {() => navigate(`edit/${item.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default WarehouseList;
