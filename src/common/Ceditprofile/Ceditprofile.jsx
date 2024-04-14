import { useNavigate } from "react-router-dom";
import { CInput } from "../../common/CInput/CInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileCall } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";
import { ButtonC } from "../ButtonC/ButtonC";


export const Ceditprofile = (info) => {

    const Data = info.userData
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token
    const userName = rdxUser.credentials.decoded.userName

    const navigate = useNavigate();

    const [params, setParams] = useState(Data);

    const [msg, setMsg] = useState("");

    const inputHandler = (e) => {
        //genero la función que bindea

        setParams((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const editProfile = async () => {
        const answer = await editProfileCall(token, params, userName)
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
            <div className="form-edit">
                <div className="form-group mt-1">
                    <CInput
                        typeProp={"email"}
                        nameProp={"email"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={`${Data?.email}`}
                    />

                </div>
                <div className="form-group mt-1">
                    <CInput
                        typeProp={"userName"}
                        nameProp={"userName"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={`${Data?.userName}`}
                    />

                </div>
                <div className="form-group mt-1">
                    <CInput
                        typeProp={"fisrtName"}
                        nameProp={"fisrtName"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={`${Data?.fisrtName ? Data?.fisrtName : "First Name"}`}
                    />

                </div>
                <div className="form-group mt-1">
                    <CInput
                        typeProp={"lastName"}
                        nameProp={"lastName"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={`${Data?.lastName ? Data?.lastName : "Last Name"}`}
                    />

                </div>
                <div className="form-group mt-1 ">
                    <CInput
                        typeProp={"about"}
                        nameProp={"about"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={`${Data?.about ? Data?.about : "About you ?"}`}
                    />

                </div>
                <div className="form-group mt-1">
                    <ButtonC
                        title={"Edit profile"}
                        className={"btn mt-4 create-post-btn"}
                        functionEmit={editProfile}
                    />
                </div>
            </div>
        </>
    )
}