import "./Navbar.scss";

function Navbar () {

    return (
        <nav>
            <div className="navItem">
                <a href="/">Home</a>
            </div>
            <div>
                <a href="/interview">Interview</a>
            </div>
        </nav>   
    );
}

export default Navbar;