import axios from "axios";
import banner from "../images/3dprint.jpg";
import "../Styles/home.css";
function Home() {
    return (
        <div className="home-grid">
            <div className="greeting" id="greeting-message">
                <h3 id="greet">Welcome</h3>
            </div>
            <div className="enter-info" id="data-entry">
                <label>Please register for your account!</label>
                <br />
                <label>First Name: </label>
                <input
                    type="text"
                    id="student-first"
                    placeholder="first"
                ></input>
                <br></br>
                <label>Last Name: </label>
                <input
                    type="text"
                    id="student-last"
                    placeholder="last"
                    required={true}
                ></input>
                <br></br>
                <div className="submit-names">
                    <button onClick={submitStudent}>Submit</button>
                </div>
            </div>

            <div className="home-container" id="home-container">
                <div className="title">
                    <h1>Ready to Print?</h1>
                    <img
                        src={banner}
                        alt="3D printed object"
                        height={225}
                        width={225}
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
                <button onClick={navigateLogout}>Logout</button>
            </div>
        </div>
    );
}

async function checkUser(response) {
    let fname = response.data["firstName"];
    let lname = response.data["lastName"];
    document.getElementById("greet").innerHTML = `Welcome ${fname} ${lname}!`;
    addGreetingNav();
}

async function addUser(response) {
    document.getElementById("data-entry").style.display = "block";
}

async function showError(response) {
    clearForms();
    alert("An error has occured :(");
}

function addGreetingNav() {
    document.getElementById("greeting-message").style.display = "block";
    document.getElementById("navs").style.display = "block";
}
function clearForms() {
    document.getElementById("greeting-message").style.display = "none";
    document.getElementById("data-entry").style.display = "none";
    document.getElementById("navs").style.display = "none";
}

function clearHome() {
    document.getElementById("home-container").style.display = "none";
    // document.getElementById("student-id").value = "";
}
function addHome() {
    document.getElementById("home-container").style.display = "block";
}

async function Submit() {
    clearForms();
    const studentId = document.getElementById("student-id").value;
    if (studentId < 1000000 || studentId > 10000000) {
        clearForms();
        alert("Student id is too big or too small");
    } else {
        let req = { warriorID: studentId };
        let response = await axios.post("/api1", req);
        if (response.data["Status"] === 200) {
            clearHome();
            let userID = response.data["userID"];
            localStorage.setItem("userID", userID);
            checkUser(response);
            document.getElementById("student-id").value = "";
        } else if (response.data["Status"] === 202) {
            clearHome();
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
    if (first.length < 1) {
        console.log(document.getElementById("student-first").value);
        alert("Please enter your first name.");
    } else if (last.length < 1) {
        console.log("Invalid lname");
        alert("Please enter your last name.");
    } else {
        let req = {
            warriorID: warriorID,
            firstName: first,
            lastName: last,
            isAdmin: false,
        };

        let response = await axios.post("/api2", req);
        if (response.status === 200) {
            document.getElementById("data-entry").style.display = "none";
            document.getElementById(
                "greet"
            ).innerHTML = `Welcome ${first} ${last}!`;
            let userID = response.data["userID"];
            localStorage.setItem("userID", userID);

            addGreetingNav();
            document.getElementById("student-first").value = "";
            document.getElementById("student-last").value = "";
            document.getElementById("student-id").value = "";
        }
    }
}
async function navigatePrint() {
    document.location.replace(document.location + "addPrint");
}
async function navigateView() {
    document.location.replace(document.location + "viewPrints");
}

async function navigateLogout() {
    clearForms();
    addHome();
    localStorage.clear();
}
export default Home;
