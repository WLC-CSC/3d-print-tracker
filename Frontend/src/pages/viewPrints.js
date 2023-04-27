function viewPrints() {
    return (
        <div>
            <h1>View current prints</h1>
            <button onClick={navigateHome}>Home</button>
        </div>
    );
}
async function navigateHome() {
    document.location.replace("/");
}
export default viewPrints;
