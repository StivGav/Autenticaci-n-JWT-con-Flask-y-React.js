import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "logout" });
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {!store.token ? (
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary me-2">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-success">Signup</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/private">
                                <button className="btn btn-info me-2">Private Area</button>
                            </Link>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};