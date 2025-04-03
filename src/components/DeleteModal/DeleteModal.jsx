import "./DeleteModal.scss";
import { useContext } from "react";
import { ModalContext } from "../../context/context.js";
import Close from "../../assets/Icons/close-24px.svg?react";

const WarehouseDeleteModal = () => {
  const { setIsModal, selectedItem } = useContext(ModalContext);

  return (
    <div className="modal__container">
      <div className="modal">
        <Close className="close-btn" onClick={() => setIsModal(false)} />

        <h1 className="modal__header">Delete {selectedItem}?</h1>

        <p>Please confirm that you'd like to delete the {selectedItem} from the list of items. You won't be able to undo this action.</p>

        <div className="modal__cta-btn">
          <button className="btn-secondary" onClick={() => setIsModal(false)}>Cancel</button>
          <button className="btn-delete">Delete</button> 
        </div>


      </div>
    </div>
  );
};

export default WarehouseDeleteModal;
