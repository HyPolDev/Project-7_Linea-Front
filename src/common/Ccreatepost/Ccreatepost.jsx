import "./Ccreatepost.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useState } from "react";
import { postPostCall } from "../../services/apiCalls";
import { ButtonC } from "../ButtonC/ButtonC";


export const Ccreatepost = () => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData)

    const [msg, setMsg] = useState("");

    const [content, setContent] = useState({
        text: "",
    });

    const inputHandler = (e) => {
        //genero la función que bindea

        setContent((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }));

        if (e.target.value.length > 71) {
            setMsg("A Line can't have more than 72 characters")
        }
        else {
            setMsg("")
        }

    };

    const createPost = async () => {

        const answer = await postPostCall(rdxUser.credentials.token, content.text)

        setMsg(`${answer.message}`)
        if (answer.success) {
            setTimeout(() => {
                navigate("/profile");
            }, 1000);
        }

    }

    return (
        <>
            <div className="row-12 create-post">
                <div className="col-12 post-heading">
                    <textarea
                        onChange={(e) => inputHandler(e)}
                        name="text"
                        id="textarea"
                        placeholder="What's happening?!"
                        maxLength="72"
                    ></textarea>
                </div>

                <div className="msg">{msg}</div>

                <ButtonC
                    title={"Post"}
                    className={"btn mt-4 create-post-btn"}
                    functionEmit={createPost}
                />
            </div>

        </>
    )
}