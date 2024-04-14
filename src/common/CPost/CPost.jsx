import "./CPost.css"
import { getUserCall, getUserPostsCall } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CLink } from "../../common/CLink/CLink";



export const CPost = ({ post }) => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const userName = rdxUser.credentials.decoded.userName

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const rawDate = post.createdAt.split("").slice(5, 10).join("").split("-")
    const date = rawDate?.map((item) => { return rawDate.indexOf(item) == 0 ? item = months[item - 1] : item }).join(" ")


    return (
        <>
            <div className="row-12 ">
                <div className="col-12 post-heading">
                    <h6 className="post-author">{post.authorName}</h6>
                    {<p className="post-timestamp">@{post.authorName} · {date}</p>}
                </div>
            </div>
            <div className="row-10 text">
                {`${post.text}`}
            </div>
            <div className="row-12">
                <div className="row mt-3 nav-post-actions">
                    <div className="col-3">
                        <i className="input-icon uil uil-heart" id="heart"></i>
                        <CLink path="/" title={`${post.likes.length}`} />
                    </div>
                    <div className="col-3">
                        <i className="input-icon uil uil-comment" id="sandwich"></i>
                        <CLink path="/" title={`${post.comments.length}`} />
                    </div>
                    <div className="col-3">
                        <i className="input-icon uil uil-repeat" id="sandwich"></i>
                        <CLink path="/" title={`${post.likes.length}`} />
                    </div>
                    <div className="col-3">
                        <i className="input-icon uil uil-bookmark" id="sandwich"></i>

                    </div>


                </div>
            </div>
        </>
    )
}