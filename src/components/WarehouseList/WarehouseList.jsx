import axios from "axios"
import { useState, useEffect } from "react"
import SearchIcon from "../../../assets/Icons/search-24px.svg?react";
import ChevronRight from "../../../assets/Icons/chevron_right-24px.svg?react";
import DeleteIcon from "../../../assets/Icons/delete_outline-24px.svg?react";
import EditIcon from "../../../assets/Icons/edit-24px.svg?react";
import "./WarehouseList.css";
import {useMediaQuery} from 'react-responsive';


export const WareHouseList = () => {
    const [wareHouses, setWareHouses] = useState([])
    const isTablet = useMediaQuery({ minWidth: 768 });

    const getWarehouses = async () => {
        const response = await axios.get('http://localhost:8000/api/warehouses');
        setWareHouses(response.data);
    }
    useEffect(() => {
        getWarehouses();
    }, []);
    console.log('Warehouses', wareHouses);

    return (
        <>
        <section className="warehouses_list">
        <section className="header">
            <h1 className="header__title">Warehouses</h1>
            <div className="header__search">
                <p className="header__search-text">Search...</p>
                <SearchIcon className="header__search-icon" />
            </div>
            <button className="header__button">+ Add New Warehouse</button>
        </section>
        <div className="warehouse-list">
            {isTablet ? (
                <table className="warehouse-table">
                <thead>
                  <tr>
                    <th>WAREHOUSE</th>
                    <th>ADDRESS</th>
                    <th>CONTACT NAME</th>
                    <th>CONTACT INFORMATION</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {wareHouses.map((warehouse, index) => (
                    <tr key={index}>
                      {/* data-label is used for the stacked layout on mobile */}
                      <td data-label="WAREHOUSE">
                        {warehouse.warehouse_name}
                        {/* Example arrow (you could also use an icon) */}
                        <span className="arrow"> &gt; </span>
                      </td>
                      <td data-label="ADDRESS">
                        {warehouse.address}
                      </td>
                      <td data-label="CONTACT NAME">
                        {warehouse.contact_name}
                      </td>
                      <td data-label="CONTACT INFORMATION">
                        <div>{warehouse.contact_phone}</div>
                        <div>{warehouse.contact_email}</div>
                      </td>
                      <td data-label="ACTIONS" className="warehouse-table__actions">
                        <button className="icon-btn">Trash</button>
                        <button className="icon-btn">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ): (
                <section className="warehouse-cards"> 
                    {wareHouses.map((warehouse, index) => (
                        <>
                        <hr className="warehouse-line" />
                        <div key={index} className="warehouse-card"> 
                        <div className="warehouse-card__col-1">
                            <div className="warehouse-card__warehouse">
                            <h4 className="warehouse-title">WAREHOUSE</h4>
                            <div className="warehouse-card__warehouse-name">
                                <p className="warehouse-name">{warehouse.warehouse_name}</p>
                                <ChevronRight className="arrow-icon" />
                            </div>
                            </div>
                            <div className="warehouse-card__address">
                            <h4 className="address-title">ADDRESS</h4>
                            <p className="address">{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
                            </div>
                        </div>
                        <div className="warehouse-card__col-2">
                            <div className="warehouse-card__contact">
                            <h4 className="contact-name">CONTACT NAME</h4>
                            <p className="contact-name-value">{warehouse.contact_name}</p>
                            </div>
                            <div className="warehouse-card__contact-information">
                            <h4 className="contact-info">CONTACT INFORMATION</h4>
                            <p className="contact-phone">{warehouse.contact_phone}</p>
                            <p className="contact-email">{warehouse.contact_email}</p>
                            </div>
                        </div>
                        
                        </div>
                        <div className="warehouse-card__icons">
                            <DeleteIcon className="delete-icon" />
                            <EditIcon className="edit-icon" />
                        </div>
                        </>
                    ))}
                
                
                
                </section>
            )}
</div>
        </section>
        </>
    )
}