import axios from "axios";
import banner from "../images/3dprint.jpg";
import "../Styles/home.css";
function Home() {
    return (
        <div className="home-grid">
            <div className="enter-info" id="data-entry">
                <label>First Name: </label>
                <input type="text" id="student-first"></input>
                <br></br>
                <label>Last Name: </label>
                <input type="text" id="student-last"></input>
                <br></br>
                <div className="submit-names">
                    <button onClick={submitStudent}>Submit</button>
                </div>
            </div>

            <div className="home-container">
                <div className="greeting" id="greeting-message">
                    <h3 id="greet">Welcome</h3>
                </div>

                <div className="title">
                    <h1>Ready to Print?</h1>
                    <img
                        src={banner}
                        alt="3D printed object"
                        height={250}
                        width={250}
                    />
                </div>
                <div className="enter-id">
                    <label>Warrior ID Number: </label>
                    <br></br>
                    <input
                        type="text"
                        id="student-id"
                        placeholder="ex: 1234567"
                    ></input>
                </div>
                <div className="submit-student">
                    <button onClick={Submit}>Submit</button>
                </div>
            </div>
            <div className="page-navigation" id="navs">
                <button onClick={navigatePrint}>Print</button>
                <button onClick={navigateView}>View</button>
            </div>
        </div>
    );
}

async function checkUser(response) {
    console.log(response.data);
    console.log(response.data["userID"]);
    let fname = response.data["firstName"];
    let lname = response.data["lastName"];
    document.getElementById("greet").innerHTML = `Welcome ${fname} ${lname}!`;
    document.getElementById("greeting-message").style.display = "block";
    document.getElementById("navs").style.display = "block";
}

async function addUser(response) {
    document.getElementById("data-entry").style.display = "block";
    console.log(response.data["Message"]);
}

async function showError(response) {
    document.getElementById("greeting-message").style.display = "none";
    document.getElementById("data-entry").style.display = "none";
    alert("An error has occured :(");
}

async function Submit() {
    document.getElementById("greeting-message").style.display = "none";
    document.getElementById("data-entry").style.display = "none";
    // console.log("URL");
    // console.log(document.URL());

    const studentId = document.getElementById("student-id").value;
    if (studentId < 1000000 || studentId > 10000000) {
        document.getElementById("greeting-message").style.display = "none";
        document.getElementById("data-entry").style.display = "none";
        alert("Student id is too big or too small");
    } else {
        let req = { warriorID: studentId };
        let response = await axios.post("/api1", req);
        if (response.data["Status"] === 200) {
            checkUser(response);
        } else if (response.data["Status"] === 202) {
            addUser(response);
        } else if (response.data["Status" === 400]) {
            showError(response);
        }
    }
}

async function submitStudent() {
    let warriorID = document.getElementById("student-id").value;
    let first = document.getElementById("student-first").value;
    let last = document.getElementById("student-last").value;
    console.log(first);
    console.log(last);
    let req = {
        warriorID: warriorID,
        firstName: first,
        lastName: last,
        isAdmin: false,
    };

    let response = await axios.post("/api2", req);
    console.log(response.status);
    if (response.status === 200) {
        document.getElementById("navs").style.display = "block";
    }
}
async function navigatePrint() {
    document.location.replace(document.location + "addPrint");
}
async function navigateView() {
    document.location.replace(document.location + "viewPrints");
}
export default Home;
