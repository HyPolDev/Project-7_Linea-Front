import "./header.css";
import { useState } from "react";
import { CLink } from "../CLink/CLink";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/searchSlice";
import { useEffect } from "react";

export const Header = () => {
    //Instancia de conexion a modo lectura
    const rdxUser = useSelector(userData);
    //Instancia de conexion a modo escritura
    const dispatch = useDispatch();

    useEffect(() => {

    }, [rdxUser]);

    const [criteria, setCriteria] = useState("");

    const searchHandler = (e) => {
        setCriteria(e.target.value);
    };

    useEffect(() => {
        const searching = setTimeout(() => {
            dispatch(updateCriteria(criteria));
        }, 375);

        return () => clearTimeout(searching);
    }, [criteria]);

    return (
        <div className="col-4 header-design">


            {rdxUser?.credentials?.token ? (
                <div className="navigator-design">
                    <div id="link"><CLink path="/" title="Home" /></div>
                    <div id="link"><CLink path="/" title="Explore" /></div>
                    <div id="link"><CLink path="/" title="Bookmarks" /></div>
                    <div id="link"><CLink path="/profile" title="Profile" /></div>
                    <div id="link"><CLink path="#" title={rdxUser?.credentials?.decoded?.userName} /></div>
                    <div
                        className="out-design"
                        onClick={() => dispatch(logout({ credentials: "" }))}
                    >
                        log out
                    </div>
                    {rdxUser?.credentials.decoded?.roleName == "admin" || rdxUser?.credentials.decoded?.roleName == "superadmin" ?
                        (<>
                            <div id="link"><CLink path="/Profiles" title="Profiles" /></div>
                            <div id="link"><CLink path="/profile" title="Posts" /></div>
                        </>) : ""}
                </div>
            ) : (
                <div className="navigator-design">
                    <CLink path="/login" title="Login" />
                </div>
            )}
        </div>
    );
};
