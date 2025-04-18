import "./EditButton.scss";
import { Link } from "react-router-dom";
import EditWhite from "../../assets/Icons/edit-white-24px.svg?react";

/** 
 * USAGE:
 * pass the path prop to the component to set the path of the button.
 * 
 * Example:
 * 
 * import EditButton from "./components/EditButton/EditButton";
 * 
 * <EditButton path={`/warehouse/edit/${id}`} />  
 * 
 * **/

const EditButton = ({ path }) => {
  return (
    <Link to={path}>
      <button className="btn-main edit-btn">
        <EditWhite /> Edit
      </button>
    </Link>
  );
};

export default EditButton;
