import { Outlet } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <main>
      <Navigation />
      <section className="main__container">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default App;
