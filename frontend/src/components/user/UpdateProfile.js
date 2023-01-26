import React, { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./UpdateProfile.css";
import Loader from "../layout/loader/Loader";
import { STATUS } from '../../redux/slices/productSlice';
import { clearError, updateProfileReset } from '../../redux/slices/userSlice';
import MetaData from '../layout/MetaData';
import { updateProfile } from '../../redux/thunks/userThunk';


const UpdateProfile = ({ user }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { name, email, avatar } = user;
    const [profile, setProfile] = useState({ name, email, avatar });

    const updateProfileInputHandler = (event) => {
        if (event.target.name !== "avatar") {
            setProfile({ ...profile, [event.target.name]: event.target.value })
        } else {
            setProfile({ ...profile, [event.target.name]: event.target.files[0] })
        }
    };

    const updateProfileSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", profile.name)
        formData.append("email", profile.email)
        formData.append("avatar", profile.avatar)
        dispatch(updateProfile(formData))
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

    const { status, error, isUpdated } = useSelector((state) => state.user)

    useEffect(() => {
        if (status === STATUS.FAILED) {
            toast(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            navigate("/user/profile");
            dispatch(updateProfileReset());
        }
    }, [status, error, dispatch, isUpdated, navigate]);


    return (<Fragment>
        {(status === STATUS.LOADING) ? <Loader /> :
            <>
                <MetaData title="Update Profile" />
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h2 className="updateProfileHeading">Update Profile</h2>
                        <form className="updateProfileForm" onSubmit={updateProfileSubmit}>
                            <div className="updateProfileName">
                                <AccountCircleIcon />
                                <input type="text" required placeholder="Name" name="name" value={profile.name} onChange={updateProfileInputHandler} />
                            </div>
                            <div className="updateProfileEmail">
                                <EmailOutlinedIcon />
                                <input type="email" required placeholder="Email" name="email" value={profile.email} onChange={updateProfileInputHandler} />
                            </div>

                            <div id="updateProfileImage">
                                <img src={profile.avatar.url ? profile.avatar.url : URL.createObjectURL(profile.avatar)} alt="avatar" />
                                <input type="file" accept="image/*" name="avatar" onChange={updateProfileInputHandler} />
                            </div>
                            <button type="submit" className="updateProfileBtn">Update</button>
                        </form>
                    </div>
                </div>
                <ToastContainer {...toastOptions} />
            </>}
    </Fragment>)
}

export default UpdateProfile;