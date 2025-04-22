import "./DeleteModal.scss";
import { useContext } from "react";
import { ModalContext } from "../../context/context.js";
import Close from "../../assets/Icons/close-24px.svg?react";

const WarehouseDeleteModal = () => {
  const { setIsModal, modalText } = useContext(ModalContext);
  const PORT = import.meta.env.VITE_PORT || 8000;

  // function for deleting a warehouse/inventory
  // this will extract the deleteCallback function from the modalText object
  // and call it when the delete button is clicked
  async function deleteHandler() {
    try {
      modalText.deleteCallback();
    } catch (error) {
      console.error(`Deletion error:`, error);
    }
  }

  return (
    <div className="modal__container">
      <div className="modal">
        <Close className="close-btn" onClick={() => setIsModal(false)} />

        <div className="modal__text-content">
          <h1 className="modal__header">{`${modalText.header}`}?</h1>
          <p>{modalText.body}</p>
        </div>

        <div className="modal__cta-btn">
          <button className="btn-secondary" onClick={() => setIsModal(false)}>Cancel</button>
          <button className="btn-delete" onClick={deleteHandler}>Delete</button> 
        </div>
      </div>
    </div>
  );
};

export default WarehouseDeleteModal;
