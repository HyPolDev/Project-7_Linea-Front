import { getUserCall, getUserPostsCall } from "../../services/apiCalls"
import { Routes, Route, Navigate } from "react-router-dom";
import "./Profile.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CLink } from "../../common/CLink/CLink";
import { Home } from "../Home/Home";
import { CProfile } from "../../common/CProfile/CProfile";

export const Profile = () => {
    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const userName = rdxUser.credentials.decoded.userName

    const [Data, setData] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            const ProfilePosts = await getUserPostsCall(rdxUser.credentials.token, userName)
            const ProfileData = await getUserCall(rdxUser.credentials.token, userName)

            setData({
                profile: ProfileData.profile[0],
                posts: ProfilePosts.data
            })

        }
        fetchData()

    }, [])

    const navigateHome = () => {
        navigate("/")
    }

    return (
        <>
            <div className="col-5 wrapper">
                <CProfile
                    userName={`${userName}`}
                />
                <div className="row-12 ">

                </div>
            </div>
        </>
    )
}