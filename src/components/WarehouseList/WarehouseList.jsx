import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from "../../../assets/Icons/search-24px.svg?react";
import ChevronRight from "../../../assets/Icons/chevron_right-24px.svg?react";
import DeleteIcon from "../../../assets/Icons/delete_outline-24px.svg?react";
import EditIcon from "../../../assets/Icons/edit-24px.svg?react";
import SortIcon from "../../../assets/Icons/sort-24px.svg?react";
import "./WarehouseList.scss";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../context/context";

const WarehouseList = () => {
  const PORT = import.meta.env.VITE_PORT || "8080";
  const URL = `http://localhost:${PORT}`;

  const [wareHouses, setWarehouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ascending, setAscending] = useState(false);

  const isTablet = useMediaQuery({ minWidth: 768 });
  const { setIsModal, setModalText } = useContext(ModalContext);

  const getWarehouses = async () => {
    const response = await axios.get(`${URL}/api/warehouses`);
    setWarehouses(response.data);
  };
  useEffect(() => {
    getWarehouses();
  }, []);

  const callModalHandler = (text) => {
    setModalText(text);
    setIsModal(true);
  };

  // search functionality
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredResults = wareHouses.filter((item) => {
      if (
        item.warehouse_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contact_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contact_phone.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return item;
      }
    });
    if (filteredResults.length > 0) {
      setWarehouses(filteredResults);
      setSearchQuery("");
    }
  };
  // sorting functionality
  const handleSort = (sortingParam, sortOrder) => {
    if (sortOrder === true) {
      wareHouses.sort((a, b) => {
        if (a[sortingParam].toLowerCase() < b[sortingParam].toLowerCase()) {
          return -1;
        }
        if (b[sortingParam].toLowerCase() < a[sortingParam].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    } else {
      wareHouses.sort((a, b) => {
        console.log(a[sortingParam], b[sortingParam]);
        if (b[sortingParam].toLowerCase() < a[sortingParam].toLowerCase()) {
          return -1;
        }
        if (a[sortingParam].toLowerCase() < b[sortingParam].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    }
    setWarehouses(wareHouses);
  };

  return (
    <>
      <section className="warehouses_list">
        <section className="header">
          <h1 className="header__title">Warehouses</h1>

          <form className="header__search">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header__search-text"
              placeholder="Search..."
            />
            <SearchIcon
              onClick={handleSubmit}
              className="header__search-icon"
            />
          </form>

          {/* Made BUTTON link to the AddNewWarehouse Component */}
          <Link to="/warehouse/add">
            <button className="header__button">+ Add New Warehouse</button>
          </Link>
        </section>
        <div className="warehouse-list">
          {isTablet ? (
            <table className="warehouse-table">
              <thead className="warehouse-table__header">
                <tr>
                  <th className="table-header">
                    <div className="table-header__contents">
                      <div>WAREHOUSE </div>
                      <div className="sort-icon">
                        <SortIcon
                          onClick={() => {
                            const newAscending = !ascending;
                            setAscending(newAscending);
                            handleSort("warehouse_name", newAscending);
                          }}
                          className="sort-icon"
                        />
                      </div>
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="table-header__contents">
                      <div>ADDRESS </div>
                      <div>
                        <SortIcon
                          onClick={() => {
                            const newAscending = !ascending;
                            setAscending(newAscending);
                            handleSort("address", newAscending);
                          }}
                          className="sort-icon"
                        />
                      </div>
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="table-header__contents">
                      <div>CONTACT NAME </div>
                      <div className="sort-icon">
                        <SortIcon
                          onClick={() => {
                            const newAscending = !ascending;
                            setAscending(newAscending);
                            handleSort("contact_name", newAscending);
                          }}
                          className="sort-icon"
                        />
                      </div>
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="table-header__contents">
                      <div>CONTACT INFORMATION</div>
                      <div className="sort-icon">
                        <SortIcon
                          onClick={() => {
                            const newAscending = !ascending;
                            setAscending(newAscending);
                            handleSort("contact_email", newAscending);
                          }}
                          className="sort-icon"
                        />
                      </div>
                    </div>
                  </th>
                  <th className="table-header">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {wareHouses.map((warehouse, index) => (
                  <>
                    <tr className="table-data" key={index}>
                      <td>
                        <Link to={`/warehouse/${warehouse.id}`}>
                          <span className="warehouse-name">
                            {warehouse.warehouse_name}
                          </span>
                          <span className="arrow-table">
                            {" "}
                            <ChevronRight />{" "}
                          </span>
                        </Link>
                      </td>
                      <td>{warehouse.address}</td>
                      <td>{warehouse.contact_name}</td>
                      <td>
                        <div>{warehouse.contact_phone}</div>
                        <div>{warehouse.contact_email}</div>
                      </td>
                      <td className="warehouse-table__actions">
                        <div className="table-delete">
                          <DeleteIcon
                            onClick={() =>
                              callModalHandler({
                                header: `Delete ${warehouse.warehouse_name} warehouse`,
                                body: `Please confirm that you'd like to delete ${warehouse.warehouse_name} from the warehouse list. You won't be able to undo this action.`,
                                objectId: warehouse.id,
                              })
                            }
                          />
                        </div>
                        <div className="table-edit">
                          <Link to={`/warehouse/edit/${warehouse.id}`}>
                            <EditIcon />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          ) : (
            <section className="warehouse-cards">
              {wareHouses.map((warehouse, index) => (
                <>
                  <div key={index} className="warehouse-card">
                    <div className="warehouse-card__col-1">
                      <div className="warehouse-card__warehouse">
                        <h4 className="warehouse-title">WAREHOUSE</h4>
                        <Link to={`/warehouse/${warehouse.id}`}>
                          <div className="warehouse-card__warehouse-name">
                            <p className="warehouse-name">
                              {warehouse.warehouse_name}
                            </p>
                            <ChevronRight className="arrow-icon" />
                          </div>
                        </Link>
                      </div>
                      <div className="warehouse-card__address">
                        <h4 className="address-title">ADDRESS</h4>
                        <p className="address">
                          {warehouse.address}, {warehouse.city},{" "}
                          {warehouse.country}
                        </p>
                      </div>
                    </div>
                    <div className="warehouse-card__col-2">
                      <div className="warehouse-card__contact">
                        <h4 className="contact-name">CONTACT NAME</h4>
                        <p className="contact-name-value">
                          {warehouse.contact_name}
                        </p>
                      </div>
                      <div className="warehouse-card__contact-information">
                        <h4 className="contact-info">CONTACT INFORMATION</h4>
                        <p className="contact-phone">
                          {warehouse.contact_phone}
                        </p>
                        <p className="contact-email">
                          {warehouse.contact_email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-card__icons">
                    <DeleteIcon
                      onClick={() =>
                        callModalHandler({
                          header: `Delete ${warehouse.item} warehouse item`,
                          body: `Please confirm that you'd like to delete ${warehouse.item} from the inventory list. You won't be able to undo this action.`,
                        })
                      }
                      className="delete-icon"
                    />
                    <Link to={`/warehouse/edit/${warehouse.id}`}>
                      <EditIcon className="edit-icon" />
                    </Link>
                  </div>
                </>
              ))}
            </section>
          )}
        </div>
      </section>
    </>
  );
};

export default WarehouseList;
