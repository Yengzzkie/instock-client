import "./DeleteModal.scss";
import { useContext } from "react";
import { ModalContext } from "../../context/context.js";
import axios from "axios";
import Close from "../../assets/Icons/close-24px.svg?react";

const WarehouseDeleteModal = () => {
  const { setIsModal, modalText } = useContext(ModalContext);
  const PORT = import.meta.env.VITE_PORT || 8000;
  console.log(modalText)

  // function that will send an axios request to delete a warehouse
  async function deleteWarehouse() {
    try {
      const response = await axios.delete(`http://localhost:${PORT}/api/warehouses/${modalText.objectId}`);
      console.log(response.data);
    } catch (error) {
      console.error(`Failed to delete warehouse with ID ${modalText.objectId}:`, error);
    } finally {
      setIsModal(false);
      window.location.reload();
    }
  }

  // function that will send an axios request to delete an inventory item
  async function deleteItem() {
    try {
      const response = await axios.delete(`http://localhost:${PORT}/api/inventories/${modalText.objectId}`);
      console.log(response.data);
    } catch (error) {
      console.error(`Failed to delete inventory item with ID ${modalText.objectId}:`, error);
    } finally {
      setIsModal(false);
      // window.location.reload();
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
          <button className="btn-delete" onClick={modalText.type === "inventory" ? deleteItem : deleteWarehouse}>Delete</button> 
        </div>
      </div>
    </div>
  );
};

export default WarehouseDeleteModal;
