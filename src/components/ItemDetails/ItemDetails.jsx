import "./ItemDetails.scss";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import InStockTag from "../InStockTag/InStockTag";
import OutOfStockTag from "../OutOfStockTag/OutOfStockTag";
import EditButton from "../EditButton/EditButton";

const ItemDetails = () => {
  const { id, itemid } = useParams();
  const [itemData, setItemData] = useState({});
  const navigate = useNavigate();
  const PORT = import.meta.env.VITE_PORT || 8000;

  // this will fetch the data for a particular item based on the itemid from params
  async function getItemData() {
    try {
      const response = await axios.get(
        `http://localhost:${PORT}/api/inventories/${itemid}`
      );

      setItemData(response.data);
    } catch (error) {
      console.error(
        `Failed to get data for warehouse with ID ${itemid}:`,
        error
      );
    }
  }

  useEffect(() => {
    getItemData();
  }, []);

  return (
    <>
      {/* NAVIGATION */}
      <div className="itemDetails__nav">
        <div className="back-link">
          <ArrowBack onClick={() => navigate(-1)} />{" "}
          <h1 className="table__nav-header">{itemData.item_name}</h1>
        </div>
        <EditButton path={`/inventory/edit/${itemid}`} />
      </div>

      {/* ITEM DETAILS CONTAINER */}
      <div className="itemDetails__container">
        <div className="itemDetails__description">
          <div>
            <p className="item-label">ITEM DESCRIPTION:</p>
            <p>{itemData.description}</p>
          </div>
          <div>
            <p className="item-label">CATEGORY:</p>
            <p>{itemData.category}</p>
          </div>
        </div>

        <div className="itemDetails__status">
          <div className="status_quantity-wrapper">
            <div>
              <p className="item-label">STATUS:</p>
              {itemData.status === "In Stock" && itemData.quantity > 0 ? <InStockTag /> : <OutOfStockTag /> }
            </div>
            <div>
              <p className="item-label">QUANTITY:</p>
              {itemData.status === "In Stock" ? itemData.quantity : 0}
            </div>
          </div>

          <div>
            <p className="item-label">WAREHOUSE:</p>
            <p>{itemData.warehouse_name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
