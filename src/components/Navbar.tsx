import {Link} from "react-router";

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link to={"/"}
                          className="text-xl">
                        Greetings
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to={"/create"}>Add</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;