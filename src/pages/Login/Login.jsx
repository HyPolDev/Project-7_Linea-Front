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
        <>
            <div class="section">
                <div class="container">
                    <div class="row full-height justify-content-center">
                        <div class="col-12 text-center align-self-center py-5">
                            <div class="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label for="reg-log"></label>
                                <div class="card-3d-wrap mx-auto">
                                    <div class="card-3d-wrapper">
                                        <div class="card-front">
                                            <div class="center-wrap">
                                                <div class="section text-center">
                                                    <h4 class="mb-4 pb-3">Log In</h4>
                                                    <div class="form-group">
                                                        {//<input type="email" class="form-style" placeholder="Email">
                                                        }
                                                        <CInput
                                                            typeProp={"email"}
                                                            nameProp={"email"}
                                                            handlerProp={(e) => inputHandler(e)}
                                                            placeholderProp={"escribe tu e-mail"}
                                                        />
                                                        <i class="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div class="form-group mt-2">
                                                        {//<input type="password" class="form-style" placeholder="Password">
                                                        }
                                                        <CInput
                                                            typeProp={"password"}
                                                            nameProp={"password"}
                                                            handlerProp={(e) => inputHandler(e)}
                                                            placeholderProp={"Password"}
                                                        />
                                                        <i class="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    {//<a href="https://www.web-leb.com/code" class="btn mt-4">Login</a>
                                                    }
                                                    <ButtonC
                                                        title={"log me!"}
                                                        className={"btn mt-4"}
                                                        functionEmit={loginMe}
                                                    />
                                                    <p class="mb-0 mt-4 text-center"><a href="#" class="link">Forgot your password?</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-back">
                                            <div class="center-wrap">
                                                <div class="section text-center">
                                                    <h4 class="mb-3 pb-3">Sign Up</h4>
                                                    <div class="form-group">
                                                        <input type="text" class="form-style" placeholder="UserName"></input>
                                                        <i class="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div class="form-group mt-2">
                                                        <input type="email" class="form-style" placeholder="Email"></input>
                                                        <i class="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div class="form-group mt-2">
                                                        <input type="password" class="form-style" placeholder="Password"></input>
                                                        <i class="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <a href="https://www.web-leb.com/code" class="btn mt-4">Register</a>
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
