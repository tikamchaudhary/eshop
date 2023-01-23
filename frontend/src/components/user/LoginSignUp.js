import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./LoginSignUp.css";
import Loader from "../layout/loader/Loader";
import profile from "../../images/profile.png"
import { loginUser, registerUser } from '../../redux/thunks/userThunk';
import { STATUS } from '../../redux/slices/productSlice';
import { clearError } from '../../redux/slices/userSlice';


const LoginSignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error, isAuthenticated } = useSelector((state) => state.user);

    //========================================================================
    const [user, setUser] = useState({ name: "", email: "", password: "", avatar: "" });

    const registerInputHandler = (event) => {
        if (event.target.name !== "avatar") {
            setUser({ ...user, [event.target.name]: event.target.value })
        } else {
            setUser({ ...user, [event.target.name]: event.target.files[0] })
        }
    };

    const registerSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", user.name)
        formData.append("email", user.email)
        formData.append("password", user.password)
        formData.append("avatar", user.avatar)
        dispatch(registerUser(formData))
    };
    // ====================================================================
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    const loginInputHandler = (event) => {
        setLoginInput({ ...loginInput, [event.target.name]: event.target.value })
    };
    const loginSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser(loginInput))
        // event.target.reset();
    };
    // ============================================================================
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };
    // ==================================================================

    const toastOptions = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    }

    useEffect(() => {
        if (status === STATUS.FAILED) {
            toast(error);
            dispatch(clearError());
        }

        if (isAuthenticated) {
            navigate("/");
        }
    }, [status, error, dispatch, isAuthenticated, navigate]);


    return (<Fragment>
        {(status === STATUS.LOADING) ? <Loader /> :
            <><div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>

                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <EmailOutlinedIcon />
                            <input type="email" required placeholder="Email" name='email' value={loginInput.email} onChange={loginInputHandler} />
                        </div>
                        <div className="loginPassword">
                            <LockIcon />
                            <input type="password" required autoComplete='off' placeholder="Password" name='password' value={loginInput.password} onChange={loginInputHandler} />
                        </div>
                        <Link to="/password/forgot">Forget Password ?</Link>
                        <button type="submit" className="loginBtn">Login</button>
                    </form>
                    {/* ================================================================= */}

                    <form className="signUpForm" ref={registerTab} onSubmit={registerSubmit}>
                        <div className="signUpName">
                            <AccountCircleIcon />
                            <input type="text" required placeholder="Name" name="name" value={user.name} onChange={registerInputHandler} />
                        </div>
                        <div className="signUpEmail">
                            <EmailOutlinedIcon />
                            <input type="email" required placeholder="Email" name="email" value={user.email} onChange={registerInputHandler} />
                        </div>
                        <div className="signUpPassword">
                            <LockIcon />
                            <input type="password" required autoComplete='off' placeholder="Password" name="password" value={user.password} onChange={registerInputHandler} />
                        </div>
                        <div id="registerImage">
                            <img src={user.avatar ? URL.createObjectURL(user.avatar) : profile} alt="avatar" />
                            <input type="file" accept="image/*" name="avatar" onChange={registerInputHandler} />
                        </div>
                        <button type="submit" className="signUpBtn">Register</button>
                    </form>
                </div>
            </div>
                <ToastContainer {...toastOptions} />
            </>}
    </Fragment>)
}

export default LoginSignUp;