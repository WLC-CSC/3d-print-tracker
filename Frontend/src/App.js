// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/Styles/App.css";
import Home from "./pages/Home";
import AddPrint from "./pages/AddPrint";
import NoPage from "./pages/NoPage";
import Header from "./components/Header";
import ViewPrints from "./pages/viewPrints";
// import NavBar from "./components/NavBar";

function App() {
    return (
        <Router>
            <Header />
            {/* <NavBar /> */}
            <Routes>
                <Route>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/addPrint" element={<AddPrint />} />
                    <Route exact path="/viewPrints" element={<ViewPrints />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App;
