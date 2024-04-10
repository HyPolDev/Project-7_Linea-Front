import { useNavigate } from "react-router-dom";
import { CInput } from "../../common/CInput/CInput";
import { ButtonC } from "../../common/ButtonC/ButtonC";
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
        userName: "",
        password: "",
    });

    const [msg, setMsg] = useState("");

    const inputHandler = (e) => {
        //genero la función que bindea

        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(e.target.name, e.target.value);
    };

    const loginMe = async () => {
        //esta será la función que desencadenará el login...
        const answer = await loginCall(credentials);

        if (answer.token) {

            const decoded = decodeToken(answer.token);

            const passport = {
                token: answer.token,
                decoded: decoded,
            };

            dispatch(login({ credentials: passport }));

            setMsg(`Welcome again ${decoded.name}`);
            console.log(passport);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
        else {
            setMsg(`Wrong credentials`)
        }
    };

    const registerMe = async () => {

        const answer = await registerCall(credentials);
        if (answer.data.newUser) {

            loginMe();

        }
        else {
            setMsg(`Wrong credentials`)
        }
    };

    return (
        <>
            <div className="section" id="bigbox">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <div className="form-group">
                                                        {//<input type="email" className="form-style" placeholder="Email">
                                                        }
                                                        <CInput
                                                            typeProp={"email"}
                                                            nameProp={"email"}
                                                            handlerProp={(e) => inputHandler(e)}
                                                            placeholderProp={"Email"}
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        {//<input type="password" className="form-style" placeholder="Password">
                                                        }
                                                        <CInput
                                                            typeProp={"password"}
                                                            nameProp={"password"}
                                                            handlerProp={(e) => inputHandler(e)}
                                                            placeholderProp={"Password"}
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    {//<a href="https://www.web-leb.com/code" className="btn mt-4">Login</a>
                                                    }
                                                    <ButtonC
                                                        title={"log me!"}
                                                        className={"btn mt-4"}
                                                        functionEmit={loginMe}
                                                    />
                                                    <p className="mb-0 mt-4 text-center"><a href="#" className="link">Forgot your password?</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-3 pb-3">Sign Up</h4>
                                                    <div className="form-group">
                                                        <CInput
                                                            typeProp={"userName"}
                                                            nameProp={"userName"}
                                                            handlerProp={(e) => inputHandler(e)}
                                                            placeholderProp={"user name"}
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <CInput
                                                            typeProp={"email"}
                                                            nameProp={"email"}
                                                            handlerProp={(e) => inputHandler(e)}
                                                            placeholderProp={"escribe tu e-mail"}
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <CInput
                                                            typeProp={"password"}
                                                            nameProp={"password"}
                                                            handlerProp={(e) => inputHandler(e)}
                                                            placeholderProp={"Password"}
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <ButtonC
                                                        title={"Register"}
                                                        className={"btn mt-4"}
                                                        functionEmit={loginMe}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
