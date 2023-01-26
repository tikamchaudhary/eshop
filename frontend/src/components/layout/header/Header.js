import React, { useState } from "react";
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import './Header.css';
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logoutUser } from "../../../redux/thunks/userThunk";

const Header = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");

    const dispatch = useDispatch()
    const { data, isAuthenticated } = useSelector((state) => state.user);
    const { user } = data;

    const submitHandler = (event) => {
        event.preventDefault();
        if (name.trim()) {
            navigate(`/products/${name}`)
        } else {
            navigate("/products")
        }
        event.target.reset();
    };

    return (<header >
        <section className="headerTop">
            <Marquee>
                <p className="m-0">Brand Waali Quality, Bazaar Waali Deal!</p>
            </Marquee>
        </section>

        <nav className="navbar fixed-top navbar-expand-lg headerNav">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand ms-lg-5" id="logo">Eshop</NavLink>
                <div id="iconDiv1">
                    <div className="mx-lg-4 ">
                        <span className="profileSpan" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <AccountCircleIcon style={{ color: "white", fontSize: window.innerWidth >= 992 ? "40px" : "42px", marginTop: "5px" }} />
                        </span>
                        {/* -- Modal -- */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-sm">
                                <div id="MODAL" className="modal-content">
                                    <div className="modal-header">
                                        <p id="name">Hello User</p>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        ...
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="me-lg-5">
                        <span className="cartSpan">
                            <i className="fa-solid fa-cart-shopping h3 text-white mt-1">
                                <Badge badgeContent={4} color="secondary" ></Badge>
                            </i>
                        </span>
                    </div>
                </div>
                <button id="btn" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toHide" aria-controls="toHide" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="toHide">
                    <ul className="navbar-nav me-auto ms-lg-5 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/products" className="nav-link">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="" className="nav-link">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="" className="nav-link">About</NavLink>
                        </li>
                    </ul>

                    <form className="d-flex searchForm" role="search"
                        onSubmit={submitHandler}
                    >
                        <input
                            className="form-control shadow-none"
                            type="search"
                            placeholder="Search a products" aria-label="Search"
                            style={{ borderRadius: "0px" }}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            className="btn"
                            type="submit"
                            style={{
                                borderRadius: "0px",
                                backgroundColor: "#900C3F",
                                color: "#ffffff",
                            }}>Search
                        </button>
                    </form>

                    <div id="iconDiv2">
                        <div className="mx-lg-4 dropdown">
                            <span className="profileSpan" data-bs-toggle="dropdown">
                                {isAuthenticated && user.avatar ? <img src={user.avatar.url} alt="avatar" /> :
                                    <AccountCircleIcon style={{ color: "white", fontSize: "40px", marginTop: "5px" }} />}
                            </span>
                            <ul className="dropdown-menu dropdown-menu-end mt-2">
                                {
                                    isAuthenticated && user?.name ?
                                        <p>Hello!,{user.name}</p> :
                                        <p>Welcome to Eshop</p>
                                }
                                <hr />
                                {
                                    (isAuthenticated && user.role === "admin") &&
                                    <li><Link className="dropdown-item" to="">
                                        <DashboardIcon className="me-2" />
                                        Dashboard
                                    </Link></li>
                                }
                                {
                                    isAuthenticated &&
                                    <li><Link className="dropdown-item" to="/user/profile">
                                        <AccountCircleOutlinedIcon className="me-2" />
                                        My profile
                                    </Link></li>
                                }
                                {
                                    isAuthenticated &&
                                    <li><Link className="dropdown-item" to="">
                                        <ListAltIcon className="me-2" />
                                        My Orders
                                    </Link></li>
                                }
                                {
                                    !isAuthenticated &&
                                    <li><Link className="dropdown-item" to="/login">
                                        <LoginRoundedIcon className="me-2" />
                                        Login/Signup
                                    </Link></li>
                                }

                                {
                                    isAuthenticated &&
                                    <li><Link className="dropdown-item" to=""
                                        onClick={() => dispatch(logoutUser())}
                                    >
                                        <LogoutRoundedIcon className="me-2" />
                                        Logout
                                    </Link></li>
                                }
                            </ul>
                        </div>

                        <div className="me-lg-5">
                            <span className="cartSpan">
                                <i className="fa-solid fa-cart-shopping h3 text-white mt-2">
                                    <Badge badgeContent={4} color="secondary" ></Badge>
                                </i>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </nav>

    </header>);
};

export default Header;
