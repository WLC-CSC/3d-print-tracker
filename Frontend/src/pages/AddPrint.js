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
    let descriptionInput = document.getElementById("print-description");
    let priceInput = document.getElementById("print-price");
    let inputUserID = localStorage.getItem("userID");
    if (descriptionInput.value === "") {
        alert("Please enter a valid description!");
    } else if (descriptionInput.value.length > 250) {
        alert("Description is too long!");
    } else if (priceInput.value === "" || parseFloat(priceInput.value) <= 0.0) {
        alert("Please enter a valid price!");
    } else if (parseFloat(priceInput.value) > 50.0) {
        alert("Woah! Easy there, pardner. That's a hunk of change there. Mayhaps you should rethink your spending budget.");
    } else {
        let req = {
            userID: inputUserID,
            description: descriptionInput.value,
            price: priceInput.value,
        };
        let response = await axios.post("/api3", req);
        if (response.status === 200) {
            navigateView();
        } else {
            alert("Please try again.");
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
