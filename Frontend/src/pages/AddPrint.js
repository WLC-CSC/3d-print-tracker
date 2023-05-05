import "../Styles/addPrint.css";
import axios from "axios";
import banner from "../images/3dprint.jpg";

function addPrint() {
    return (
        <div className="print-grid">
            <div className="greeting">
                <h1>Please enter your print info:</h1>
                <p>current user: {localStorage.getItem("userID")}</p>
            </div>
            <div className="print-container">
                <img
                    src={banner}
                    alt="3D printed object"
                    height={250}
                    width={250}
                />
                <br></br>
                <label>Description: </label>
                <input
                    type="text"
                    id="print-description"
                    placeholder="description"
                    required
                ></input>
                <br></br>
                <label>Price:</label>
                <input
                    type="number"
                    id="print-price"
                    min="0.00"
                    max="999.99"
                    placeholder="$0.00"
                    step={0.01}
                    required
                ></input>
                <br></br>
                <button onClick={submitPrint}>Add Print</button>
            </div>
            <div className="submit-print">
                <button onClick={navigateHome}>Home</button>
                <button onClick={navigateView}>View Prints</button>
            </div>
        </div>
    );
}
async function submitPrint() {
    let inputDescription = document.getElementById("print-description").value;
    let inputPrice = document.getElementById("print-price").value;
    let inputUserID = localStorage.getItem("userID");
    if (document.getElementById("print-description").value === "") {
        alert("Please enter a valid description!");
    } else if (document.getElementById("print-price").value === "") {
        alert("Please enter a valid price!");
    } else {
        let req = {
            userID: inputUserID,
            description: inputDescription,
            price: inputPrice,
        };
        let response = await axios.post("/api3", req);
        if (response.status === 200) {
            console.log("Print submitted");
            document.getElementById("print-description").value = "";
        } else {
            alert("Please try again.");
            console.log("Print failed");
        }
    }
}
function navigateHome() {
    document.location.replace("/");
}
function navigateView() {
    document.location.replace("/viewPrints");
}
export default addPrint;
