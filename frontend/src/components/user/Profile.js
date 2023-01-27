import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Profile.css";
import Loader from '../layout/loader/Loader';
import { STATUS } from '../../redux/slices/productSlice';
import MetaData from '../layout/MetaData';

const Profile = () => {
    const { data, status } = useSelector((state) => state.user);
    const { user } = data;

    return (
        <Fragment>
            {(status === STATUS.LOADING) ? <Loader /> :
                <>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h2>My Profile</h2>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/user/profile/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{(user.createdAt).substr(0, 15)}</p>
                                {/* <p>{String(user.createdAt).substr(0, 10)}</p> */}
                            </div>
                            <div>
                                <Link to="/user/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>}
        </Fragment>
    )
}

export default Profile;