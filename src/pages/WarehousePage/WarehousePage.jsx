import { Link } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../context/context";
import Delete from "../../assets/Icons/delete_outline-24px.svg?react";
import ChevronRight from "../../assets/Icons/chevron_right-24px.svg?react";
import Edit from "../../assets/Icons/edit-24px.svg?react";
import Sort from "../../assets/Icons/sort-24px.svg?react";

const TABLE_HEAD = [
  "Warehouse",
  "Address",
  "Contact Name",
  "Contact Information",
  "Actions",
];

const TABLE_DATA = [
  { id: 1, item: "Manhattan", address: "503 Broadway, New York, USA", name: "Parmin Aujla", contact: "+1 (629) 555-0129" },
  { id: 2, item: "Washington", address: "33 Pearl Street SW, Washington, USA", name: "Graeme Lyon", contact: "+1 (647) 504-0911" },
  { id: 3, item: "Jersey", address: "300 Main Street, New Jersey, USA", name: "Brad MacDonald", contact: "+1 (401) 377-2337" },
  { id: 4, item: "San Fran", address: "890 Brannan Street, San Francisco, USA", name: "Gary Wong", contact: "+1 (239) 555-0108" },
  { id: 5, item: "Santa Monica", address: "520 Broadway, Santa Monica, USA", name: "Sharon Ng", contact: "+1 (270) 555-0117" },
  { id: 6, item: "Seattle", address: "1201 Third Avenue, Seattle, USA", name: "Daniel Bachu", contact: "+1 (480) 555-0103" },
  { id: 7, item: "Miami", address: "2650 NW 5th Avenue, Miami, USA", name: "Alana Thomas", contact: "+1 (647) 832-2065" },
];

const WarehousePage = () => {
  const { setIsModal, setModalText } = useContext(ModalContext);
  
  const callModalHandler = (text) => {
    setModalText(text);
    setIsModal(true);
  };
  
  return (
    <>
      <div className="table__container">
        <div className="table__nav">
          <div className="back-link">
            <h1 className="table__nav-header">Warehouses</h1>
          </div>
          <button className="btn-main edit-btn">
            + Add New Warehouse
          </button>
        </div>

        <table className="warehouse_table">
          {/* TABLE HEADER */}
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index}>
                  <span>
                    {head.toUpperCase()} <Sort />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {/* TABLE BODY */}
          <tbody>
            {TABLE_DATA.map((row, index) => (
              <tr key={index}>
                <td className="table__item-name" data-label="Warehouse">
                  <Link to={`${row.id}`}>{row.item}</Link> <ChevronRight />
                </td>
                <td data-label="Address">{row.address}</td>
                <td data-label="Name">{row.name}</td>
                <td data-label="Contact">{row.contact}</td>
                <td data-label="Action">
                  <Delete
                    onClick={() => callModalHandler({header: `Delete ${row.item} warehouse item`, body: `Please confirm that you'd like to delete ${row.item} from the warehouse list. You won't be able to undo this action.`})}
                    className="table__cta-delete"
                  />
                  <Link to={`edit/${row.id}`}>
                    <Edit className="table__cta-edit" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WarehousePage;
