const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <label>Student ID Number</label><br></br>
            <input type="text" id="student-id"></input><br></br>
            <button onClick={Submit}>Submit</button>
        </div>
    );
};


const Submit = () => {
    const studentId = document.getElementById("student-id").value;
    alert("Youur student ID is " + studentId);
}

export default Home;