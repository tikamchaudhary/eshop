import React from 'react';
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footerTop container-fluid">
                <div className="row">

                    <div className="footer1 col-md-3 col-sm-6">
                        <Link to="/" className='linkColor' id='footer1h1'>
                            <h1>Eshop</h1>
                        </Link>
                        <p>
                            Brand Waali Quality, Bazaar Waali Deal! and High Quality is our first priority.
                        </p>
                        <p className='mb-0'>Download App.</p>
                        <img src="https://res.cloudinary.com/dcj1ykq51/image/upload/v1674844394/Eshop/assets/playStore_mojzzf.png" alt="playStore" />
                        <img src="https://res.cloudinary.com/dcj1ykq51/image/upload/v1674844393/Eshop/assets/appStore_sywts7.png" alt="appStore" />
                        <div>
                            <i className="fa-solid fa-lock me-2"></i>
                            Secure Online Payment.
                        </div>
                        <div className='payIcon'>
                            <i className="fa-brands fa-cc-visa"></i>
                            <i className="fa-brands fa-cc-mastercard"></i>
                            <i className="fa-brands fa-cc-paypal"></i>
                            <i className="fa-brands fa-cc-amazon-pay"></i>
                        </div>
                    </div>

                    <div className="footer2 col-md-3 col-sm-6">
                        <div className="m-auto">
                            <h2>Categories</h2>
                            <ul>
                                <li><Link to="" className='linkColor'>Mobiles</Link></li>
                                <li><Link to="" className='linkColor'>Laptops</Link></li>
                                <li><Link to="" className='linkColor'>Watches</Link></li>
                                <li><Link to="" className='linkColor'>Clothes</Link></li>
                                <li><Link to="" className='linkColor'>Footwear</Link></li>
                                <li><Link to="" className='linkColor'>Glocery</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className=" footer3 col-md-3 col-sm-6">
                        <h2>Informations</h2>
                        <ul>
                            <li><Link to="" className='linkColor'>About Us</Link></li>
                            <li><Link to="" className='linkColor'>Contact Us</Link></li>
                            <li><Link to="" className='linkColor'>Terms & Conditions</Link></li>
                            <li><Link to="" className='linkColor'>Return & Exchange</Link></li>
                            <li><Link to="" className='linkColor'>Shipping & Delivery</Link></li>
                            <li><Link to="" className='linkColor'>Private Policy</Link></li>
                        </ul>
                    </div>

                    <div className="footer4 col-md-3 col-sm-6">
                        <h2>Contact</h2>
                        <p className='mb-0 fs-4'>Address:</p>
                        <p>Iglas Aligarh UP,India,<br />Pin Code - 202001.</p>
                        <hr />
                        <div>
                            <i className="fa-solid fa-mobile me-2 fs-5"></i>
                            Mobile: 8077662051
                        </div>
                        <div>
                            <i className="fa-brands fa-square-whatsapp me-2 fs-5"></i>
                            Whats app: 8077662051
                        </div>
                        <div>
                            <i className="fa-solid fa-envelope me-2 fs-5"></i>
                            Email: tikamsingh172@gmail.com
                        </div>
                        <div>
                            <a
                                className='linkColor'
                                target="_blank" rel="noreferrer"
                                href='https://github.com/tikamsingh172/'
                            >
                                <i className="fa-brands fa-square-github me-2 fs-5 "></i>
                                Github
                            </a>
                            <a
                                className='linkColor'
                                target="_blank" rel="noreferrer"
                                href='https://www.linkedin.com/in/tikam-singh-5b04a4219'
                            >
                                < i className="fa-brands fa-linkedin me-2 ms-5 fs-5"></i>
                                Linkedln
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <div className="footerBottom container-fluid">
                <p>&copy; 2023 Tikam Singh, All Rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;