import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import { ModalContext } from "./context/context";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState(null);

  return (
    // I used context provider to make the delete modal globally accessible across all pages
    // reason behind is the modal's parent container is confined within the size of the Outlet which is 80%
    <ModalContext.Provider value={{ isModal, setIsModal, modalText, setModalText }}>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <main className="app__wrapper">
        {isModal && <DeleteModal />}
        <Navigation />

        <section className="main__container">
          <Outlet />
        </section>

        <Footer />
      </main>
    </ModalContext.Provider>
  );
};

export default App;
