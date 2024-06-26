import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Header } from "../../common/header/header";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect } from "react";
import { Profile } from "../Profile/Profile";
import { CProfile } from "../../common/CProfile/CProfile";
import { Post } from "../Post/Post";
import { AdminProfiles } from "../AdminProfiles/AdminProfiles";
import { AdminPosts } from "../AdminPosts/AdminPosts";

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
                        <Route path="/post" element={<Post />} />
                        <Route path="/Profiles" element={<AdminProfiles />} />
                        <Route path="/Posts" element={<AdminPosts />} />
                    </Routes>
                    <div className="col-4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Future chats and Search bar</div>
                </>)
                : (<Login />)}

        </>
    );
};
