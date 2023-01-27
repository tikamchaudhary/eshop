import React, { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ForgotPassword.css";
import Loader from "../layout/loader/Loader";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { forgotPassword } from "../../redux/thunks/userThunk";
import { STATUS } from "../../redux/slices/productSlice";
import { clearError } from "../../redux/slices/userSlice";

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { message, status, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        dispatch(forgotPassword({ email }));
    };

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
        if (message) {
            toast(message);
        }
    }, [status, error, dispatch, message]);

    return (
        <Fragment>
            {status === STATUS.LOADING ? <Loader /> :
                <Fragment>
                    <MetaData title="Forgot Password" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">Forgot Password</h2>

                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
                                    <EmailOutlinedIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Send"
                                    className="forgotPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                    <ToastContainer {...toastOptions} />
                </Fragment>}
        </Fragment>
    );
};

export default ForgotPassword;
