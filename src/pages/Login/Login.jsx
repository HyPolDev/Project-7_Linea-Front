import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import "./Login.css";
import { loginCall } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login } from "../../app/slices/userSlice";

export const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");

    const inputHandler = (e) => {
        //genero la función que bindea

        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const loginMe = async () => {
        //esta será la función que desencadenará el login...
        const answer = await loginCall(credentials);
        if (answer.data.token) {

            const decoded = decodeToken(answer.data.token);

            const passport = {
                token: answer.data.token,
                decoded: decoded,
            };

            dispatch(login({ credentials: passport }));

            setMsg(`Welcome again ${decoded.name}`);

            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
        else {
            setMsg(`Wrong credentials`)
        }
    };

    return (
        <div className="login-container loginElementsDesign">
            {msg === "" ? (
                <>
                    <CustomInput
                        typeProp={"email"}
                        nameProp={"email"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={"escribe tu e-mail"}
                    />
                    <CustomInput
                        typeProp={"password"}
                        nameProp={"password"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={"escribe el password"}
                    />

                    <ButtonC
                        title={"log me!"}
                        className={"regularButtonClass"}
                        functionEmit={loginMe}
                    />
                </>
            ) : (
                <div>{msg}</div>
            )}
            {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
        </div>
    );
};
