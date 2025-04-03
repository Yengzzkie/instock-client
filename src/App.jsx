import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer"
import DeleteModal from "./components/DeleteModal/DeleteModal";
import { ModalContext } from "./context/context";

const App = () => {
      const [isModal, setIsModal] = useState(false);
      const [selectedItem, setSelectedItem] = useState(null);

  return (
    // I used context provider to make the delete modal globally accessible across all pages
    // reason behind is the modal's parent container is confined within the size of the Outlet which is 80%
    <ModalContext.Provider value={{ isModal, setIsModal, selectedItem, setSelectedItem  }}>  

      <main className="app__wrapper">
        {isModal && <DeleteModal /> }
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
