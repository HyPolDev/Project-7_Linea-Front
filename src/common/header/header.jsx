import "./header.css";
import { useState } from "react";
import { CLink } from "../CLink/CLink";

//RDX

import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/searchSlice";
import { useEffect } from "react";
import { CInput } from "../CInput/CInput";

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
                    <CLink path="/" title="Home" />
                    <CLink path="/" title="Explore" />
                    <CLink path="/" title="Bookmarks" />
                    <CLink path="/profile" title="Profile" />
                    <CLink path="#" title={rdxUser?.credentials?.decoded?.userName} />
                    <div
                        className="out-design"
                        onClick={() => dispatch(logout({ credentials: "" }))}
                    >
                        log out
                    </div>
                </div>
            ) : (
                <div className="navigator-design">
                    <CLink path="/login" title="Login" />
                </div>
            )}
        </div>
    );
};
