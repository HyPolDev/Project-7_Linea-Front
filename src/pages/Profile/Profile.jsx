import { getUserCall, getUserPostsCall } from "../../services/apiCalls"
import "./Profile.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";

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

    console.log(Data?.profile);

    const navigateHome = () => {
        navigate("/")
    }

    return (
        <>
            <div className="col-5 wrapper">
                <div className="row heading">
                    <div className="col-2 arrow-box" onMouseUp={() => navigateHome()}>
                        <i className="input-icon uil uil-arrow-left arrow"></i>
                    </div>
                    <div className="col-10">
                        <h3 className="user-name">{userName}</h3>
                        <p className="n-posts">{Data?.posts?.length} Posts</p>
                    </div>
                </div>
                <div className="row full-name">
                    <h6>
                        {Data?.profile?.fisrtName ? Data.profile.fisrtName : ""}
                    </h6>
                    <h6>
                        {Data?.profile?.lastName ? Data.profile.lastName : ""}
                    </h6>
                </div>
                <div className="row little-user-name">
                    <p>
                        @{userName}
                    </p>
                </div>
            </div>
        </>
    )
}