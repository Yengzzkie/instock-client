import "./Table.scss";
import Delete from "../../assets/Icons/delete_outline-24px.svg?react";
import Edit from "../../assets/Icons/edit-24px.svg?react";
import Sort from "../../assets/Icons/sort-24px.svg?react";
import InStockTag from "../InStockTag/InStockTag";
import OutOfStockTag from "../OutOfStockTag/OutOfStockTag";

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
  return (
    <div className="table__container">

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
              <td>{row.item}</td>
              <td>{row.category}</td>
              <td>{row.quantity !== 0 ? <InStockTag /> : <OutOfStockTag />}</td>
              <td>{row.quantity}</td>
              <td>
                <Delete className="table__cta" />
                <Edit className="table__cta" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
