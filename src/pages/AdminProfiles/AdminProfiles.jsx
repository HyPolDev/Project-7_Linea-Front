import { getUserCall, getUserPostsCall, getUsersCall } from "../../services/apiCalls"
import { Routes, Route, Navigate } from "react-router-dom";
import "./AdminProfiles.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CLink } from "../../common/CLink/CLink";
import { Home } from "../Home/Home";
import { CProfile } from "../../common/CProfile/CProfile";
import { ButtonC } from "../../common/ButtonC/ButtonC";
import { CPost } from "../../common/CPost/CPost";

export const AdminProfiles = () => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const userName = rdxUser.credentials.decoded.userName

    const [Data, setData] = useState(null)

    useEffect(() => {

        const fetchData = async () => {

            const ProfileData = await getUsersCall(rdxUser.credentials.token, userName)

            setData({
                profile: ProfileData.users,

            })

        }
        fetchData()

    }, [])

    useEffect(() => {

    }, [Data])

    const navigateHome = () => {
        navigate("/")
    }

    return (
        <>
            {Data?.profile.length > 0 ?
                <div className="col-4 wrapper">
                    <div className="wrapper">{Data?.profile?.map((element) => {
                        return (
                            <CProfile
                                key={element._id}
                                userName={`${element.userName}`}
                            />


                        )
                    })}</div>
                </div> :
                <div className="no-posts">There are no Posts</div>
            }
        </>
    )
}