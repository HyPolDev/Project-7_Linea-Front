import "./Home.css"
import "../Profile/Profile.css"
import { CPost } from "../../common/CPost/CPost";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useState, useEffect } from "react";
import { getPostsCall } from "../../services/apiCalls";
import { Ccreatepost } from "../../common/Ccreatepost/Ccreatepost";


export const Home = () => {

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


    return (
        <>
            <div className="col-5 wrapper">
                {Data?.posts.length > 0 ?
                    <>
                        <Ccreatepost />
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
        </>
    )
}