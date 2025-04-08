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
  const [wareHouses, setWarehouses] = useState([]);
  const isTablet = useMediaQuery({ minWidth: 768 });
  const { setIsModal, setModalText } = useContext(ModalContext);

  const getWarehouses = async () => {
    const response = await axios.get("http://localhost:8000/api/warehouses");
    setWarehouses(response.data);
  };
  useEffect(() => {
    getWarehouses();
  }, []);
  console.log("Warehouses", wareHouses);
  const callModalHandler = (text) => {
    setModalText(text);
    setIsModal(true);
  };

  return (
    <>
      <section className="warehouses_list">
        <section className="header">
          <h1 className="header__title">Warehouses</h1>

          <form className="header__search">
            <input onChange={(e) => e.target.value} className="header__search-text" placeholder="Search..."/>
            <SearchIcon className="header__search-icon" />
          </form>
          <button className="header__button">+ Add New Warehouse</button>
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
                        <SortIcon className="sort-icon" />
                      </div>
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="table-header__contents">
                      <div>ADDRESS </div>
                      <div>
                        <SortIcon className="sort-icon" />
                      </div>
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="table-header__contents">
                      <div>CONTACT NAME </div>
                      <div className="sort-icon">
                        <SortIcon className="sort-icon" />
                      </div>
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="table-header__contents">
                      <div>CONTACT INFORMATION</div>
                      <div className="sort-icon">
                        <SortIcon className="sort-icon" />
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
                        <Link to={`/warehouse/:${warehouse.id}`}>
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
                          onClick={() => callModalHandler({header: `Delete ${warehouse.item} warehouse item`, body: `Please confirm that you'd like to delete ${warehouse.item} from the inventory list. You won't be able to undo this action.`})}
                          />
                        </div>
                        <div className="table-edit">
                          <Link to={`/warehouse/edit/:${warehouse.id}`}>
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
                        <Link to={`/warehouse/:${warehouse.id}`}>
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
                    onClick={() => callModalHandler({header: `Delete ${warehouse.item} warehouse item`, body: `Please confirm that you'd like to delete ${warehouse.item} from the inventory list. You won't be able to undo this action.`})}
                    className="delete-icon" />
                    <Link to={`/warehouse/edit/:${warehouse.id}`}>
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