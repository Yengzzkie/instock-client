import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import WarehouseEdit from "../../components/WarehouseEdit/WarehouseEdit";

const HomePage = () => {
  return (
    <>
    {/* <div>
      <h1>Header</h1>
      <h2>Sub-Header</h2>
      <h3>labes/links/buttons</h3>
      <h4>table Header</h4>
      <p>body </p>
      <button className="btn-main"> Button Main Test</button>
      <button className="btn-secondary"> Button Secondary Test</button>
      <button className="btn-delete"> Button Delete Test</button>

      <div className="container">Basic Ass Container</div>
    </div> */}

    <Navigation />
    <WarehouseEdit />

    <Footer />
    </>
  );
};

export default HomePage;
