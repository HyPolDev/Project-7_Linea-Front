import { getPostsCall, getUserCall, getUserPostsCall, getUsersCall } from "../../services/apiCalls"
import { Routes, Route, Navigate } from "react-router-dom";
import "./AdminPosts.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CLink } from "../../common/CLink/CLink";
import { Home } from "../Home/Home";
import { CProfile } from "../../common/CProfile/CProfile";
import { ButtonC } from "../../common/ButtonC/ButtonC";
import { CPost } from "../../common/CPost/CPost";
import { Ccreatepost } from "../../common/Ccreatepost/Ccreatepost";

export const AdminPosts = () => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const userName = rdxUser.credentials.decoded.userName

    const [Data, setData] = useState(null)

    useEffect(() => {

        const fetchData = async () => {

            const Posts = await getPostsCall(rdxUser.credentials.token)

            setData({
                posts: Posts.posts

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
        <div className="col-4 wrapper">
            {Data?.posts.length > 0 ?
                <>
                    <div>{Data?.posts?.map((element) => {
                        return (
                            <CPost
                                key={element._id}
                                post={element}>
                            </CPost>
                        )
                    })}</div>
                    <div className="no-more-posts">
                        You scrolled all the way down!!
                    </div>
                </> :
                <div className="no-posts">There are no Posts</div>
            }
        </div>
    )
}