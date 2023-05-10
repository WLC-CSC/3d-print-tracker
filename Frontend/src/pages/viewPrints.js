import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/viewPrints.css";

function ViewPrints() {
    const [prints, setPrints] = useState([]);

    useEffect(() => {
        const handleGetPrints = async () => {
            let printsArray = [];
            let inputUserID = localStorage.getItem("userID");
            let req = {
                userID: inputUserID,
            };
            let response = await axios.post("/api4", req);
            let printsData = response.data["prints"];
            for (let print in printsData) {
                let uid = printsData[print]["userID"];
                uid = uid.toString();
                if (uid === inputUserID) {
                    printsArray.push(printsData[print]);
                }
            }
            printsArray = printsArray.reverse();
            for (let print in printsArray) {
                if (printsArray[print]["invoiced"] === false) {
                    printsArray[print]["invoiced"] = "No";
                } else {
                    printsArray[print]["invoiced"] = "Yes";
                }
                let date = printsArray[print]["printDate"];
                let new_date = date.substring(0, date.indexOf("00:"));
                printsArray[print]["printDate"] = new_date;
                printsArray[print]["price"] = "$" + printsArray[print]["price"].toFixed(2);
            }
            setPrints(printsArray);
        };
        handleGetPrints();
    }, []);

    const navigateHome = () => {
        document.location.replace("/");
    };
    async function navigatePrint() {
        document.location.replace("/addPrint");
    }

    return (
        <div className="view-grid">
            <div className="greeting">
                <h1>Your 3D Prints</h1>
            </div>
            <div className="view-container">
                <div className="submit-view">
                    <button onClick={navigatePrint}>Add Print</button>
                    <button onClick={navigateHome}>Logout</button>
                </div>
                <br></br>
                <table className="view-table">
                    <thead>
                        <tr>
                            <th>Description:</th>
                            <th>Price:</th>
                            <th>Date:</th>
                            <th>Invoiced:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prints.map((print) => (
                            <tr key={print.printID}>
                                <td>{print.description}</td>
                                <td>{print.price}</td>
                                <td>{print.printDate}</td>
                                <td>{print.invoiced}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewPrints;
