import { useState } from "react";
import axios from "axios";
import "../Styles/viewPrints.css"

function ViewPrints() {
    const [prints, setPrints] = useState([]);

    const handleGetPrints = async () => {
        let printsArray = []
        let inputUserID = localStorage.getItem("userID");
        let req = {
            userID: inputUserID,
        };
        let response = await axios.post("/api4", req);
        let printsData = response.data["prints"];
        for (let print in printsData){
            if (printsData[print]["userID"] == inputUserID){
                printsArray.push(printsData[print])
            }
        }
        for (let print in printsArray) {
            if (printsArray[print]["invoiced"] === false) {
                printsArray[print]["invoiced"] = "No";
            } else if (printsData[print]["invoiced"] === true) {
                printsArray[print]["invoiced"] = "Yes";
            }
        }
        await setPrints(printsArray);
    };

    const navigateHome = () => {
        document.location.replace("/");
    };
    async function navigatePrint() {
        document.location.replace("/addPrint");
    }

    return (
        <div className="view-grid"onLoad={handleGetPrints}>
            <div className="greeting">
                <h1>Your 3D Prints</h1>
            </div>
            <div className="view-container">
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
                            <tr key={print.id}>
                                <td>{print.description}</td>
                                <td>{print.price}</td>
                                <td>{print.printDate}</td>
                                <td>{print.invoiced}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="submit-view">
                <button onClick={handleGetPrints}>View Prints</button>
                <button onClick={navigateHome}>Home</button>
                <button onClick={navigatePrint}>Add Print</button>
            </div>
           
        </div>
    );
}

export default ViewPrints;
