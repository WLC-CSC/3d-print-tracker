import { useState } from "react";
import axios from "axios";

function ViewPrints() {
    const [prints, setPrints] = useState([]);

    const handleGetPrints = async () => {
        let inputUserID = localStorage.getItem("userID");
        let req = {
            userID: inputUserID,
        };
        let response = await axios.post("/api4", req);
        let printsData = response.data["prints"];
        for (let print in printsData) {
            if (printsData[print]["invoiced"] === false) {
                printsData[print]["invoiced"] = "No";
            } else if (printsData[print]["invoiced"] === true) {
                printsData[print]["invoiced"] = "Yes";
            }
        }
        await setPrints(printsData);
        console.log(prints);
    };

    const navigateHome = () => {
        document.location.replace("/");
    };
    async function navigatePrint() {
        document.location.replace("/addPrint");
    }

    return (
        <div onLoad={handleGetPrints}>
            <h1>Your 3D Prints</h1>
            <table>
                <thead>
                    <tr>
                        <th>Description:</th>
                        <th>Price:</th>
                        <th>Date:</th>
                        <th>invoiced:</th>
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
            <button onClick={handleGetPrints}>View Prints</button>
            <button onClick={navigateHome}>Home</button>
            <button onClick={navigatePrint}>Add Print</button>
        </div>
    );
}

export default ViewPrints;
