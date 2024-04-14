import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Header } from "../../common/header/header";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect } from "react";
import { Profile } from "../Profile/Profile";
import { CProfile } from "../../common/CProfile/CProfile";

export const Body = () => {

    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [rdxUser]);

    return (
        <>
            {rdxUser?.credentials?.token ?
                (<><Header />
                    <Routes>
                        <Route path="*" element={<Navigate to={"/"} replace />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/Profile" element={<Profile />} />
                    </Routes>
                </>)
                : (<Login />)}

        </>
    );
};
