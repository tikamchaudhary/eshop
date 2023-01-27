import React, { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import "./UpdatePassword.css";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { updatePasssword } from "../../redux/thunks/userThunk";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../redux/slices/productSlice";
import { clearError, updateProfileReset } from "../../redux/slices/userSlice";

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const passwordData = { oldPassword, newPassword, confirmPassword }
        dispatch(updatePasssword(passwordData));
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

    const { status, error, isUpdated } = useSelector((state) => state.user);

    useEffect(() => {
        if (status === STATUS.FAILED) {
            toast(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            toast("Password Change Successfully");
            navigate("/user/profile");
            dispatch(updateProfileReset());
        }
    }, [status, error, dispatch, isUpdated, navigate]);

    return (
        <Fragment>
            {status === STATUS.LOADING ? <Loader /> :
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Change Password</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        autoComplete="off"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        autoComplete="off"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        autoComplete="off"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                    <ToastContainer {...toastOptions} />
                </Fragment>}
        </Fragment>
    );
};

export default UpdatePassword;
