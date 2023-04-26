import { Outlet, Link } from "react-router-dom";
import pic from "../images/temp-banner.jpg";
import styles from "../styles.module.css";
import "../generalStyles.css";

const Layout = () => {
    return (
        <>
            <header>
                <a href="home.html"></a>
                <h1 className={styles.banner}>WLC 3D Print Tracker</h1>
                <img src={pic}></img>
            </header>
            <nav className="styles.nav-grid">
                <div><Link to="/">Home</Link></div>
                <div><Link to="/AddPrint">Add Print</Link></div>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;
// npm i - D react - router - dom