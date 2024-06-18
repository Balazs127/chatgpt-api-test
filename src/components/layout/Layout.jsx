import Navbar from "./Navbar";
import "./Layout.scss";

function Layout(props) {

    return (
        <div className="layout">
            <Navbar />
            
            <main>{props.children}</main>

        </div>
    );
}

export default Layout;