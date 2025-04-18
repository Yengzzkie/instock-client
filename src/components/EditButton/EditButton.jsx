import "./EditButton.scss";
import { Link } from "react-router-dom";
import EditWhite from "../../assets/Icons/edit-white-24px.svg?react";

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
