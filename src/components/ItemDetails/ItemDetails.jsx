import "./ItemDetails.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg?react";
import EditWhite from "../../assets/Icons/edit-white-24px.svg?react";
import InStockTag from "../InStockTag/InStockTag";
import OutOfStockTag from "../OutOfStockTag/OutOfStockTag";

const ITEM_DATA = {
  description:
    'This 50", 40K LED TV provides a crystal-clear picture and vivid colors.',
  category: "Electronics",
  warehouse: "Washington",
  quantity: 500,
};

const ItemDetails = () => {
  const { id } = useParams();

  return (
    <>
      {/* NAVIGATION */}
      <div className="itemDetails__nav">
        <Link to={`/warehouse/${id}`}>
          <div className="back-link">
            <ArrowBack /> <h1 className="table__nav-header">Television</h1>
          </div>
        </Link>
        <button className="btn-main edit-btn">
          <EditWhite /> Edit
        </button>
      </div>

      {/* ITEM DETAILS CONTAINER */}
      <div className="itemDetails__container">
        <div className="itemDetails__description">
          <div>
            <p className="item-label">ITEM DESCRIPTION:</p>
            <p>{ITEM_DATA.description}</p>
          </div>
          <div>
            <p className="item-label">CATEGORY:</p>
            <p>{ITEM_DATA.category}</p>
          </div>
        </div>

        <div className="itemDetails__status">
          <div className="status_quantity-wrapper">
            <div>
              <p className="item-label">STATUS:</p>
              {ITEM_DATA.quantity > 0 ? <InStockTag /> : <OutOfStockTag />}
            </div>
            <div>
              <p className="item-label">QUANTITY:</p>
              {ITEM_DATA.quantity}
            </div>
          </div>

          <div>
            <p className="item-label">WAREHOUSE:</p>
            <p>{ITEM_DATA.warehouse}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
