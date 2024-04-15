import "./CPost.css"
import { editProfileCall, editpostCall, getUserCall, getUserPostsCall, likePostCall } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CLink } from "../../common/CLink/CLink";
import { CInput } from "../CInput/CInput";
import { ButtonC } from "../ButtonC/ButtonC";



export const CPost = ({ post }) => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const userName = rdxUser.credentials.decoded.userName
    const token = rdxUser.credentials.token

    const [Txt, setTxt] = useState({ id: post?._id })

    const inputHandler = (e) => {
        //genero la función que bindea

        setTxt((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const rawDate = post.createdAt.split("").slice(5, 10).join("").split("-")
    const date = rawDate?.map((item) => { return rawDate.indexOf(item) == 0 ? item = months[item - 1] : item }).join(" ")

    const [likePressed, setlikePressed] = useState(post.likes.includes(userName) ? true : false)

    const likepost = () => {
        setlikePressed(!likePressed)
        const answer = likePostCall(token, post._id)
    }

    const form = document.getElementById(`${post?._id}`) || undefined

    const viewEdit = () => {

        form.style.visibility == "hidden" ?
            form.style.visibility = "visible" :
            form.style.visibility = "hidden"
    }

    const editPost = async () => {
        const answer = await editpostCall(token, Txt)

        if (answer.success) {
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
        else {
            console.log("could not edit profile");
        }
    }

    return (
        <>
            <div className="row-12 ">
                <div className="col-12 post-heading">
                    <h6 className="post-author">{post.authorName}</h6>
                    {<p className="post-timestamp">@{post.authorName} · {date}</p>}
                    {post.authorName == rdxUser.credentials.decoded.userName ? (
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" onClick={() => viewEdit()} id="dropdownMenuButton1">
                                <i className="input-icon uil uil-edit-alt" ></i>
                            </button>

                        </div>
                    ) : ""
                    }
                </div>
            </div>
            <div className="row-10 text">
                {`${post.text}`}
            </div>
            <div className="row-12">
                <div className="row mt-3 nav-post-actions">
                    <div className="col-3" onClick={() => likepost()}>
                        <i className="input-icon uil uil-heart" id="heart" ></i>
                        <CLink path="/" title={`${post.likes.length + (post.likes.includes(userName) ? likePressed ? 0 : -1 : likePressed ? 1 : 0)}`} />
                    </div>
                    <div className="col-3" >
                        <i className="input-icon uil uil-comment" id="sandwich"></i>
                        <CLink path="/" title={`${post.comments.length}`} />
                    </div>
                    <div className="col-3">
                        <i className="input-icon uil uil-repeat" id="sandwich"></i>
                        <CLink path="/" title={`${post?.reposts ? post?.reposts : "0"}`} />
                    </div>
                    <div className="col-3">
                        <i className="input-icon uil uil-bookmark" id="sandwich"></i>

                    </div>


                </div>
            </div>
            <div className="edit-post-input" id={`${post?._id}`} style={{ visibility: "hidden" }}>
                <CInput
                    typeProp={"message"}
                    nameProp={"message"}
                    handlerProp={(e) => inputHandler(e)}
                    placeholderProp={`${post?.text}`}
                />
                <ButtonC
                    title={"Edit post"}
                    className={"btn mt-4 create-post-btn"}
                    functionEmit={editPost}
                />
            </div>
        </>
    )
}