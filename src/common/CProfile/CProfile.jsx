import { getUserCall, getUserPostsCall } from "../../services/apiCalls"
import "./CProfile.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CLink } from "../CLink/CLink";
import { ButtonC } from "../ButtonC/ButtonC";
import { Ceditprofile } from "../Ceditprofile/Ceditprofile";

export const CProfile = ({ userName }) => {
    const navigate = useNavigate();
    const rdxUser = useSelector(userData);

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

    const form = document.getElementById("edit-id") || undefined

    const editProfile = () => {
        form.style.visibility == "hidden" ?
            (form.style.visibility = "visible",
                form.style.height = "auto") :
            (form.style.visibility = "hidden",
                form.style.height = "0")
    }

    return (
        <>
            <div className="heading">
                <div className="col-2 arrow-box" onMouseUp={() => navigateHome()}>
                    <i className="input-icon uil uil-arrow-left arrow"></i>
                </div>
                <div className="col-10">
                    <h3 className="user-name">{userName}</h3>
                    <p className="n-posts">{Data?.posts?.length} Posts</p>
                </div>
                <ButtonC
                    title={"Edit"}
                    className={"btn mt-4 ml-5 edit-button"}
                    functionEmit={editProfile}
                />
            </div>
            <div className="row-12 heading-background"></div>
            <div className="row full-name">
                <h6>
                    {Data?.profile?.fisrtName ? Data.profile.fisrtName + " " : ""}
                    {Data?.profile?.lastName ? Data.profile.lastName : ""}
                </h6>

            </div>
            <div className="row little-user-name">
                <p>
                    @{userName}
                </p>
            </div>
            <div className="row-8 full-name">
                <p className="about">
                    {Data?.profile?.fisrtName ? Data.profile.about + " " : ""}
                </p>

            </div>
            <div className="row little-user-name">
                <div className="col-4 " id="followers">
                    <CLink path="/" title={`${Data?.profile?.followers.length} Followers`} />
                </div>
                <div className="col-4">
                    <CLink path="/" title={`${Data?.profile?.following.length} Following`} />
                </div>

            </div>
            <div className="row mt-5 nav-post">
                <div className="col-3">
                    <CLink path="/" title="Posts" />
                </div>
                <div className="col-3">
                    <CLink path="/" title="Replies" />
                </div>
                <div className="col-3">
                    <CLink path="/" title="Likes" />
                </div>
                {userName == rdxUser.credentials.decoded.userName ? (
                    <div className="col-3">
                        <CLink path="/" title="Saves" />
                    </div>
                ) : ""
                }

            </div>

            {userName == rdxUser.credentials.decoded.userName ? (
                <div className="edit-profile" id="edit-id" style={{ position: "relative", height: 0, visibility: "hidden" }}>
                    <Ceditprofile
                        userData={Data?.profile} />
                </div>
            ) : ""
            }
        </>
    )
}